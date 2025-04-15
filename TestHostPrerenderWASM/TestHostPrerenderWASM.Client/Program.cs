using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.JSInterop;
using TestHostPrerenderWASM.Client;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

// Use the value in your app logic
var independentClientGhPagesString = builder.Configuration["INDEPENDENT_CLIENT_GH_PAGES"];
bool independentClientGhPages = false; // Default value if not found or invalid

if (!string.IsNullOrEmpty(independentClientGhPagesString))
{
    if (independentClientGhPagesString.ToLowerInvariant() == "true")
    {
        independentClientGhPages = true;
    }
    else if (independentClientGhPagesString.ToLowerInvariant() == "false")
    {
        independentClientGhPages = false;
    }

}
if (independentClientGhPages) { 

    builder.RootComponents.Add<App>("#app");
    builder.RootComponents.Add<HeadOutlet>("head::after");
    builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
}



await builder.Build().RunAsync();




