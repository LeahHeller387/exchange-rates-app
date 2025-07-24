# Stage 1: Build React client application
FROM node:20 AS client-build
WORKDIR /exchangerates-web

# Install frontend dependencies
COPY exchangerates-web/package*.json ./
RUN npm install

# Copy remaining client files and build the production version
COPY exchangerates-web ./
RUN npm run build

# Stage 2: Prepare ASP.NET runtime environment
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Stage 3: Build ASP.NET backend API
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Disable telemetry and first-time experience
ENV DOTNET_CLI_TELEMETRY_OPTOUT=1
ENV DOTNET_SKIP_FIRST_TIME_EXPERIENCE=1

# Copy backend project files
COPY ExchangeRates.Api ./ExchangeRates.Api

# Restore dependencies and build the project
WORKDIR /src/ExchangeRates.Api
RUN dotnet restore
RUN dotnet build -c Release -o /app/build

# Stage 4: Publish ASP.NET project
FROM build AS publish
WORKDIR /src/ExchangeRates.Api
RUN dotnet publish -c Release -o /app/publish

# Stage 5: Final runtime container — combines backend and frontend
FROM base AS final
WORKDIR /app

# Copy published backend output
COPY --from=publish /app/publish .

# Copy built React files into wwwroot for static serving
COPY --from=client-build /exchangerates-web/build ./wwwroot

# Set the entrypoint to run the ASP.NET application
ENTRYPOINT ["dotnet", "ExchangeRates.Api.dll"]
