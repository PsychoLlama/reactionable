# Reactionable
*Unceremonious redux actions*

## Why?
If you use redux a bunch, you might have noticed a pattern:

- Create a new action type
- Make an action creator using the new type
- Create a new reducer which handles that type

Every redux type is handled differently, and actions never seem to share a type. If adding one means adding the other, why keep them separate at all?

This library is an experiment to see what happens.

## Installing
It's on npm as `reactionable`.

```sh
yarn add reactionable

npm install reactionable --save
```

Now you can import it!

```js
import {Action, Reducer} from 'reactionable'

// Or for the ES5 among you.
const {Action, Reducer} = require('reactionable')
```

## API
There are two factory functions, `Action` and `Reducer`.

You write action creators/reducers using `Action` and combine them together into a reducer.

### `Action(String type, Object config)`
Generates a new redux action creator, coupled with its reducer.

```js
export const updateName = Action('UPDATE_NAME', {

  // Formats a redux action.
  creator: (name) => ({name}),

  // Merges that action into state.
  reducer: (state = {}, {name}) => ({ ...state, name }),
})
```

### `Reducer(actions)`
Creates a redux reducer using a collection of actions. It accepts an array of actions to watch for, or an object containing actions.

```js
import * as actions from './my-actions'
import {Reducer} from 'reactionable'

export const reducer = Reducer(actions)
```

## Support
This repo isn't actively maintained, it's just an experiment.
