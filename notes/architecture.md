# Architecture

## Database

Prisma is a database object-relation-mapper (object-relational? relationship? I forget... one of those, everyone just calls it an ORM). What this does is define the relationships from different tables in the database in a way that they can be more easily retrieved and saved as a group. In the case of this app, this isn't much of a deal since the data we're collecting is really simple, but this also helps with code generation, making this project 'type-safe'[^2]. This makes things significantly less error prone, more extensible, and more maintainable for whichever developer works on this next.

In our case, Prisma is running on top of Postgres, a free & open source variation of Microsoft's licensed Sql. While the database is free to use, hosting it is unfortunately not. Currently, the project is setup to work with Prisma's hosted database, but this can be easily changed.

I chose to initially setup the database to be hosted by Prisma for two reasons[^3]:

1. The free plan is [incredibly generous](https://www.prisma.io/pricing) at 100,000 transactions per month. The overall storage limit is reasonably small, but for text based storage like we're doing it will be enough for thousands of responses[^3] (62,500 if the average is slightly under 8,000 characters). The great thing about Prisma is that they charge per _transaction_, rather than per compute time which means we can structure the code to make fewer calls to the database, lowering our usage.
2. The 'serverless'[^1] architecture of this type of app relies on low latency times, and Prisma excels here. This isn't as big of a concern for this app since the only time a user that isn't an administrator will be interacting with the database is when they submit an onboarding form response, but it's increased performance that's so far for free.

> Prisma as an ORM is pretty deeply integrated with the app to this point, but that doesn't mean we need to host the database with Prisma. Because Prisma runs on top of multiple databases (postgres in our case) we can host our database anywhere that type of database can run.

## Front-end

[React](https://react.dev/) for modularization and performance with [Next.js](https://nextjs.org/) for server side rendering, keeping everything in one place, and performance improvements over React alone, and [Tailwind](https://tailwindcss.com/docs/installation/using-vite) for consistent styling and theming; all current industry standards.

## Back-end

[Trpc](https://trpc.io/) for improved performance and type-safety[^2] across the network. This will hopefully make things easier for whoever works on this next, and it makes the application much less error prone, more maintainable and more extensible.

Trpc is a 'remote procedure call' library that runs inside Next.js's server, so the server will be hosted where ever the Next.js container is hosted, Vercel in our case. This server is, ironically... serverless[^1] which will cut down the operation costs to zero until there's significant traffic. This usage can be monitored easily on Vercel's surprisingly user-friendly dashboard.

### Authentication

Authentication is handled by a free and open source [OAuth](https://oauth.net/2/) library, [Auth.js](https://authjs.dev/). OAuth 2.0 is the industry standard, and is often a strict requirement when working with security sensitive providers like payment handlers.

The authentication works in two steps:

1. First, the user must be authenticated by Google. This can be changed or extended to include other providers if needed.
2. The user's email is compared to a list of approved emails that you can set via an environment variable, directly in Vercel. This variable is just a comma separated list of Google emails that will be allowed to authenticate as administrators.

Only if a user has access to that account on Google and if that account is listed in the approved emails variable mentioned above will they be granted access to the administrator pages.

## Handover To-Do

1. Transfer Google cloud application used for authentication. There's no charge unless you get to like Amazon or Ebay level traffic.
2. Transfer application on Github. Github is a code repository operated by Microsoft that is the default place to store code. It's free, and Vercel will read directly from Github making Github something you can setup once and never worry about again. Just don't forget your password, because you'll need to give the next developer access when it's time to update things.
3. Transfer application on Vercel. This obviously requires a Vercel account, but a free account will almost surely be fine for the intended use of this application. This would be your sort of 'home' for interacting with the app. You can see some basic user statistics here, all of your usage data as it pertains to the app's monthly allotments, see data from your database, check if there are any error logs, and update the permitted administrator emails.

[^1]: **Serverless:** Perhaps the dumbest name in all of tech, this has nothing to do with being actually serverless. Instead it's a type of server architecture that shuts down individual servers in between requests, saving power and resources and making things incredibly cheap to operate.

[^2]: **Type Safety:** A format in some languages that makes the compiler much more strict. This catches errors that would otherwise slip by before the app is even built, and integrates with most code editors to make the life of the next developer much easier and continued work on the app much more stable.

[^3]: Vercel gave up on their first-party postgres database and instead integrated with a handful of companies, with Prisma being one of them. This will make the database manageable directly from the associated Vercel account, but the actual service will be provided by this third-party, Prisma as the app is setup now.
