<a href="https://github.com/refinedev/refine" target="_blank">
  <img src="logo.png" />
</a>

### Open Source Crowdfunding Platform on the Blockchain

### [RAIDream Live URL](https://raidream.vercel.app/)

Why crowdfund with R-A.I Dream? Zero commission, fully transparent, all transactions are viewable on the blockchain

Voting on proposals is securely done in realtime.

### Why not just use Kickstarter?

Kickstarter takes a huge 5% fee and imposes a limited duration to raise funds, typically 30-90 days. Also, a significant number of campaigns do not reach their funding goals, which can be demotivating for creators and result in a loss of time and resources invested in preparing and launching the campaign.

Also there are region restrictions such as in Mainland China, Iran, Sudan, Cuba, Syria, Lebanon, Yemen. Decentralized finance provides a solution through ETH or DAI.

## Stage 1:

2024-07-21 ~ 2024-08-01: Build the platfrom scaffold to handle users, posting,

### Stage 2:

2024-08: Start building ETH wallet integration on testnet

### Stage 3

Launch on Mainnet and start raising funds

## How it works

refine is an open-source React framework for rapidly developing CRUD apps like admin panels, dashboards, and internal tools.
It can speed up your development time up to 3X without compromising freedom on styling, customization and project workflow.

`<Refine>` is the root component of the app rendered in `App.tsx` . Authentication handles by built-in `AuthProvider` support.

Thanks to `dataProvider` we can easily connect to any API and perform CRUD operations.

`<Refine>` component has a `resources` prop which is an array of objects that define the resources of the app.

[Refer documentation for more information](https://refine.dev/docs/api-reference/core/)

## Getting Started

You can view a live demo over at xxx

Clone the repo:

```
git clone https://github.com/bbershadsky/aidream.git
```

Go to directory and install dependencies:

```
npm install
```

To start development server:

```
npm run start
```

To deploy to Vercel:

```
vc deploy --prod
```

## Appwrite Provisioning

Create an API key for your Appwrite project

```bash
pyenv install 3.12.0 && pyenv local 3.12.0
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python main.py
```

Add the resulting Database and Collection IDs to `.env`

## Users Table

| column name            | type      | required | array | default value |
| ---------------------- | --------- | -------- | ----- | :-----------: |
| name                   | string255 | true     | false |       -       |
| username               | string255 | true     | false |       -       |
| bio                    | string255 | false    | false |       -       |
| email                  | email     | false    | false |       -       |
| language               | string20  | false    | true  |       -       |
| image                  | string255 | false    | false |       -       |
| token                  | string255 | false    | false |       -       |
| votesUP                | number    | false    | false |       0       |
| votesDN                | number    | false    | false |       0       |
| country                | string    | false    | false |       -       |
| role                   | string    | false    | false |       -       |
| address                | string255 | false    | false |       -       |
| preferredPaymentMethod | string255 | false    | false |       -       |

## Projects (Article) Table

| column name    | type        | required | array | default value |
| -------------- | ----------- | -------- | ----- | :-----------: |
| slug           | string255   | false    | false |       -       |
| author         | string50    | true     | false |       -       |
| name           | string255   | false    | false |       -       |
| title          | string255   | false    | false |       -       |
| body           | string10000 | false    | false |       -       |
| description    | string10000 | false    | false |       -       |
| favorited      | boolean     | false    | false |       -       |
| favoritesCount | integer     | false    | false |       0       |
| tagList        | string50    | false    | true  |       0       |
| language       | string50    | false    | false |       -       |
| currency       | string50    | false    | false |       -       |
| image          | string255   | false    | false |       -       |

## Tech Stack

- Frontend: NextJS
- Appwrite Cloud Services: Database, Authentication, Functions, Storage

## Why Appwrite

Appwrite provided the perfect backend tech stack, offering user-friendly authentication, fast database management, and efficient storage and function services.

**General functionality:**

- Authenticate users via JWT (login/register pages + logout button on settings page)
- CRU\* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR\*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users
