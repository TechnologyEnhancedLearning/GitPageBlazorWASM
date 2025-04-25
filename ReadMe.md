# Good to know

The purpose is quick cicd.
You can change your version of your package in the centralised solution and it will be picked up in consuming projects.
You can optionally use a project reference for faster development by setting a flag.
A build number could be automated into package names, the package already is automatically created on build. 
So it should be possible to have a consuming project automatically get the version as a flag also for fast development across the package and consuming project.

The pipeline is similar pushing to your branch makes a package if tests are passed and updates the test page to show it. Merging does the same 
but makes a production package and gh-page site.

(Dependabot should automatically merge none breaking update too)

Strict branch and commit naming is enforced for versioning, and versioning and changelog of the repo and packages are automated from them.

Having testing, package build, github pages in the same solution is to enable quick development and automatic testing of packages before being built,
and automatic version and release of pages and packages.

# About


This is a little project for testing the options for creating a wiki style pages to showcase each component on a github page.
The same setup is ideal for testing as each component has its own page and the browser based no javascript tests require a page
to go to test the component.

The testing project need prerender so needs server host client blazor webassembly so that the static (though we will put our nojs endpoint forms here)
server html prerendered html can be provided before the webassembly which needs javascript to get onto the browser.
If there is no javascript a pure webassembly project will not load anything.

This means testing requires webassembly prerender, github requires pure webassembly.

To acheive both there are two approaches in this project.
For both, and because we are testing and displaying a package ultimately, we need the package project, and a project for components just
for the wiki style component pages.

This leaves us with very slim projects for providing delivering the html/wasm.

Option 1:
Have a prerender project for testing. This involves two project which is standard the server side and the client side.
And have a seperate pure wasm project for github pages.

Option 2:
Put in code in csproj and program.cs into the .client project that is release only. This allows us to publish it as a seperate
project and get a pure wasm project. or run the server project debug for testing which because it is not release still works.

We also need a folder with an index.html end point for this.

Both these options work in this project.

On push the project make a package, hosts it, makes a testpage, on merging the branch to master it makes a production page and package.

# Setup notes - (incomplete but a starting point)
1. Env vars (local is source controlled because its a prototype so will need some env vars)
   - May need to set these system wide and then restart or just restart vs
1. increment the bclversion because otherwise you will generate the same version but with a different hash
1. Clean project
1. build package project
 - need to run npm i at this level for gulp (its not centralised)
1. build solution potentially or just individual projects so package rebuilding isnt out of sync
1. run TestHostPrerenderWASM


## Details

The 404 page is because the Blazor is a spa the routing does not work as a github page, such that from the blazor entry point page you
can get to and load your pages. But if you refresh those pages github will not find them at that route. 

The 404 is picked up and redirects to index parses the request and index receives it and sends you there to side step this issue.

For the context we are using this project this is an ok approach.

## How it is published
It will need gitactions and it will need a hook maybe enforcing prepush rule to run tests as it may be prerender based test may not run
in the pipeline?

Going into the pure wasm project or .client project and running a publish
 dotnet publish --configuration Release

## What to look at

yml files, and csproj, and solution configurations, appsettings in client, the githubs themselves.



### YML files

It would be better if everywhere system environmental variables can be used that github environmental variables can be used.
Due to centralisation, and projects having different debug and release behavior and automatic package building these advantages coming together caused challenges.
In addition blazor client has its own challenges in receiving values. So sed is used a bit. Recommend for future just deleting and renaming files
for simplicity where the variables are safe. 

Nektos Act has also been used with this project to run local pipelines as a test

The desired output would be environment value for whether gh_pages are being generated as a flag for how the client builds, a flag for whether to build the package,
and then building the whole solution. This may be worth exploring again if there are issues with lock files being out of sync for example. As the pipeline 
builds projects not a whole solution build.

#### Dev
- multiple checks run, all of them run so that you can see if multiple fail but all must suceed to have package creating
- semver can fail if a change isnt required so has a an error catch "--dry run" may actaully be better first
	- semver versions the repo, and it provides the version we will apply to the package
	 - the package also has a timestamp added so its always updated, this is not best practice however suits our purpose in development
	 - if there isnt a new version needed we can use the git tag version value, which isnt a recalculation using other commits so isnt as good but useful still
	 - in development packages have branch names in them (they cant be marked prerelease in the git package feed)
- the package is built
- the package is then used in a build of sharedpages, which is then used in the release client build which generates published files for gh-pages
- the published pages is put in an artifact
- a script in a separate repo so there can be a separate test page is run (there is a copy in this repo) it consumes the artifact and makes the page 

#### Pull request
- just some checks they can be run even if they fail to see if there are multiple errors. They only show temporarily in the pr ui section of the
git pull request but can be seen in actions.
They have been added in the branch rules which runs jobs selected from existing pipelines. This should add them to the list of checks.


#### Release
- similar to dev but without tests as these have already happened and no feature name in package, and the gh-page is released on this repo.

## local development
- use project reference
- or
	- in local packages increase bcl version
	- build the package
	- run TestHostPrerenderWASM (not client) 

## Notes
Also DevServer needed adding to .client
NPM is not centralised like nuget because only using for just the TEL package css

### Other bits
- some githooks are in this project for local pre-push to automatically trigger nektos act or commitlint
the global local hooks from ggshield is overriding local hooks in repos. 
One option was something like husky but the right hook manager to have global and local hooks
its out of scope was just a nice to have. But in the hooks folder can see working examples
but they only work when triggered by git bash. they would work assumedly if put globally.
You can put in global scripts commands to run local hooks.


### Branch naming and commit naming see realserc

feat: A new feature
fix: A bug fix
docs: Documentation only changes
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
perf: A code change that improves performance
test: Adding missing or correcting existing tests
chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Refs
[How to make 404 redirect for spa behaviour](https://blog.elmah.io/blazor-wasm-404-error-and-fix-for-github-pages/)
[git nektos act](https://github.com/nektos/act)
[nektos](https://nektosact.com/)
	- [Confluence gitguardian](https://hee-tis.atlassian.net/wiki/spaces/TP/pages/3855253505/GitGuardian+Setup+-+Simplified+Version)
	- [Confluence gitguardian extra](https://hee-tis.atlassian.net/wiki/spaces/TP/pages/3849289743/Secrete+Detection+-+GitGuardian+Setup+Extensive+Version)


# Outstanding
- git checks off branch rules and pull request yml seem not to be triggering
- auto merge pr doesnt seem to trigger atm
- some of the local variable set bools like for using project references are disabled

# Future Recommendation

There are options for making packing the blazor more efficient, as in smaller for the browser using it.
The would be worth exploring there are recommendations in the build tasks when the pipeline runs, also mudblazor is open and any process they have is 
worth considering.

Use hooks for gitguardian and commitlint

# Where to see the site


See the page this creates in github:

See prototype project :
https://github.com/TechnologyEnhancedLearning/MVCBlazor

This project is public which is required to be github page hosted

It should be at:
https://technologyenhancedlearning.github.io/GitPageBlazorWASM/
https://technologyenhancedlearning.github.io/GitPageBlazorWASM-TestGHPage/

Packages:
https://github.com/users/Phil-NHS/packages/nuget/package/TELBlazorComponentLibrary.GitPageBlazorWasm

# References

- [microsoft official docs (didn't actually use these but if end up needing to change it could start here)](https://learn.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/webassembly?view=aspnetcore-8.0#github-pages)
 
# Project structure

<style>
tr th:nth-child(2), 
tr td:nth-child(2) {
  white-space: nowrap;       /* Prevent wrapping */
  overflow: visible;         /* Allow overflow */
  text-overflow: unset;      /* Remove ellipsis or clipping */
  word-wrap: normal;         /* Prevent word breaks */
  word-break: normal;        /* Prevent breaking within words */
}
</style>
# Project Structure
|  Description  | File Structure |
|----------------|-------------|
| Centralised package dependancy and config file for cicd  | &#9507; GitPageBlazorWasm |
| Test host client, and if built with release standalone client | &#160;&#160;&#160;&#160;&#9507; GitPageBlazorWASM.Client |
| The package that will be consumed by LH for example | &#160;&#160;&#160;&#160;&#9507; Package.BlazorComponentLibrary |
| A seperate component rewriten in the pipeline with the package number | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; BCLVersion |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; VersionInfo.cs |
| minimal examples | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; Components |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; SimpleCounter.razor |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; DependencyInjection |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; DependencyInjection.cs |
| there will be unit and e2e, e2e needs the test host client environment | &#160;&#160;&#160;&#160;&#9507; PlaywrightXUnitGoesHere |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; justcheckinggitguardian.cs |
| these are the wiki style pages for gh-page sites | &#160;&#160;&#160;&#160;&#9507; SharedPages |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; Layout |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; ComponentPageLayout.razor |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; MainLayout.razor |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; Pages |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; ComponentPages |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; CounterComponentPage.razor |
|  | &#160;&#160;&#160;&#160;&#9495; TestHostPrerenderWASM |
| Provides prerendering and host client for testing | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; TestHostPrerenderWASM |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; Components |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; _Imports.razor |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; App.razor |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; Program.cs |
| Debug hosted by test host, standalone on release for gh-pages | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; TestHostPrerenderWASM.Client |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; _Imports.razor |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; App.razor |
| Files copied to wwwroot on release to enable to standalone | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; GitPagesEntryPoint |
| Blazor is a spa and we are hosted by github so it is necassary to redirect 404s for routing | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; 404.html |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; index.html |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; Program.cs |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; Routes.razor |