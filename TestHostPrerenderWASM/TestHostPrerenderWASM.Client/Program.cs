using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using TestHostPrerenderWASM.Client;

var builder = WebAssemblyHostBuilder.CreateDefault(args);



if (Environment.GetEnvironmentVariable("INDEPENDENT_CLIENT_GH_PAGES") != null)
{
    builder.RootComponents.Add<App>("#app");
    builder.RootComponents.Add<HeadOutlet>("head::after");
    builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
}


await builder.Build().RunAsync();




