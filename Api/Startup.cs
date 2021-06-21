using System;
using LiveDiagram.Api.Common;
using LiveDiagram.Api.Services;
using LiveDiagram.Api.SignalR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace LiveDiagram.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR(options =>
            {
                options.MaximumReceiveMessageSize = Int64.MaxValue;
            });

            var diagramLoader = new DiagramLoader();
            var diagramService = new DiagramService(diagramLoader);
            services.AddSingleton<IDiagramService>(diagramService);

            var actionService = new ActionService();
            services.AddSingleton<IActionService>(actionService);

            var mainNotifier = new MainNotifier();
            mainNotifier.Start();
            services.AddSingleton<IMainNotifier>(mainNotifier);

            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();
            app.UseCors(builder =>
            {
                builder.WithOrigins("http://localhost:8080").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<MainHub>("/hub");
            });
        }
    }
}
