## myGoalsApi


Backend Api that is used to create the MyGoals app.

## API



### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |



### Goal

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET   | `/goals`             | `goals#index`    |
| POST   | `/goals/create`             | `goals#create`    |
| GET  | `/goals/<goal_id>` | `goals#show`  |
| PATCH  | `/goals/<goal_id>` | `goals#update`  |
| DELETE | `/goals/<goal_id>`        | `goals#delete`   |




### MoodBoard

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET   | `/mymoodboard`             | `photos#index`    |
| POST   | `/mymoodboard/add`     | `photo#create`    |
| DELETE | `mymoodboard/photo_id`   |`photo#delete` |

### Goal Journal

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET   | `/myjournal`             | `journal#index`    |
| POST   | `/mymoodboard/newentry`     | `entry#create`    |
| DELETE | `mymoodboard/entry_id`   |`entry#delete` |