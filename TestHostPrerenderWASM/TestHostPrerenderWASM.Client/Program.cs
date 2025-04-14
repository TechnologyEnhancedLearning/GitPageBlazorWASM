using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using TestHostPrerenderWASM.Client;

var builder = WebAssemblyHostBuilder.CreateDefault(args);



Console.WriteLine($"INDEPENDENT_CLIENT_GH_PAGES value: '{Environment.GetEnvironmentVariable("INDEPENDENT_CLIENT_GH_PAGES")}'");

if (Environment.GetEnvironmentVariable("INDEPENDENT_CLIENT_GH_PAGES") != null)
{
    Console.WriteLine("Condition is TRUE - Adding root components");
    builder.RootComponents.Add<App>("#app");
    builder.RootComponents.Add<HeadOutlet>("head::after");
    builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
}
else
{
    Console.WriteLine("Condition is FALSE - Environment variable is null");
}


await builder.Build().RunAsync();




