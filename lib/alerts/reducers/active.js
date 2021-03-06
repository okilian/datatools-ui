// @flow

import update from 'react-addons-update'

import type {Action} from '../../types/actions'
import type {ActiveState} from '../../types/reducers'

export const defaultState = {active: null}

/* eslint-disable complexity */
const active = (state: ActiveState = defaultState, action: Action): ActiveState => {
  let entities, foundIndex, updatedEntity
  switch (action.type) {
    case 'UPDATE_ACTIVE_ALERT_ALERT':
      return update(state, {active: {$set: action.payload}})
    case 'SET_ACTIVE_ALERT_PROPERTY':
      const stateUpdate = {active: {}}
      // iterate over keys in payload and update alert property
      for (var key in action.payload) {
        if (action.payload.hasOwnProperty(key)) {
          stateUpdate.active[key] = {$set: action.payload[key]}
        }
      }
      return update(state, stateUpdate)
    case 'SET_ACTIVE_ALERT_PUBLISHED':
      return update(state, {active: {published: {$set: action.payload}}})
    case 'ADD_ACTIVE_ALERT_AFFECTED_ENTITY':
      return update(state, {active: {affectedEntities: {$push: [action.payload]}}})
    case 'UPDATE_ACTIVE_ALERT_ENTITY':
      foundIndex = state.active.affectedEntities.findIndex(e => e.id === action.payload.entity.id)
      if (foundIndex !== -1) {
        switch (action.payload.field) {
          case 'TYPE':
            updatedEntity = update(action.payload.entity, {
              type: {$set: action.payload.value},
              stop: {$set: null},
              route: {$set: null},
              stop_id: {$set: null},
              route_id: {$set: null}
            })
            entities = [
              ...state.active.affectedEntities.slice(0, foundIndex),
              updatedEntity,
              ...state.active.affectedEntities.slice(foundIndex + 1)
            ]
            return update(state, {active: {affectedEntities: {$set: entities}}})
          case 'AGENCY':
            updatedEntity = update(action.payload.entity, {agency: {$set: action.payload.value}})
            entities = [
              ...state.active.affectedEntities.slice(0, foundIndex),
              updatedEntity,
              ...state.active.affectedEntities.slice(foundIndex + 1)
            ]
            return update(state, {active: {affectedEntities: {$set: entities}}})
          case 'MODE':
            updatedEntity = update(action.payload.entity, {mode: {$set: action.payload.value}})
            entities = [
              ...state.active.affectedEntities.slice(0, foundIndex),
              updatedEntity,
              ...state.active.affectedEntities.slice(foundIndex + 1)
            ]
            return update(state, {active: {affectedEntities: {$set: entities}}})
          case 'STOP':
            const stopId = action.payload.value !== null ? action.payload.value.stop_id : null
            // set route to null if stop is updated for type stop
            if (action.payload.entity.type === 'STOP') {
              updatedEntity = update(action.payload.entity, {
                stop: {$set: action.payload.value},
                stop_id: {$set: stopId},
                agency: {$set: action.payload.agency},
                route: {$set: null},
                route_id: {$set: null}
                // TODO: update agency id from feed id?
              })
            } else {
              updatedEntity = update(action.payload.entity, {
                stop: {$set: action.payload.value},
                stop_id: {$set: stopId},
                agency: {$set: action.payload.agency}
                // TODO: update agency id from feed id?
              })
            }
            entities = [
              ...state.active.affectedEntities.slice(0, foundIndex),
              updatedEntity,
              ...state.active.affectedEntities.slice(foundIndex + 1)
            ]
            return update(state, {active: {affectedEntities: {$set: entities}}})
          case 'ROUTE':
            const routeId = action.payload.value !== null ? action.payload.value.route_id : null
            // set route to null if stop is updated for type stop
            if (action.payload.entity.type === 'ROUTE') {
              updatedEntity = update(action.payload.entity, {
                route: {$set: action.payload.value},
                route_id: {$set: routeId},
                agency: {$set: action.payload.agency},
                stop: {$set: null},
                stop_id: {$set: null}
                // TODO: update agency id from feed id?
              })
            } else {
              updatedEntity = update(action.payload.entity, {
                route: {$set: action.payload.value},
                route_id: {$set: routeId},
                agency: {$set: action.payload.agency}
                // TODO: update agency id from feed id?
              })
            }
            entities = [
              ...state.active.affectedEntities.slice(0, foundIndex),
              updatedEntity,
              ...state.active.affectedEntities.slice(foundIndex + 1)
            ]
            return update(state, {active: {affectedEntities: {$set: entities}}})
        }
      }
      return state
    case 'DELETE_ACTIVE_ALERT_AFFECTED_ENTITY':
      foundIndex = state.active.affectedEntities
        .findIndex(e => e.id === action.payload.id)
      if (foundIndex !== -1) {
        entities = [
          ...state.active.affectedEntities.slice(0, foundIndex),
          ...state.active.affectedEntities.slice(foundIndex + 1)
        ]
        return update(state, {active: {affectedEntities: {$set: entities}}})
      }
      return state
    default:
      return state
  }
}

export default active
