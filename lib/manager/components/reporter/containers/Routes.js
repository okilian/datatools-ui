// @flow

import { connect } from 'react-redux'

import RouteLayout from '../components/RouteLayout'
import { fetchRoutes, fetchRouteDetails, routeOffsetChange } from '../../../../gtfs/actions/routes'
import { patternRouteFilterChange } from '../../../../gtfs/actions/patterns'
import {getRouteData} from '../../../selectors'

import type {dispatchFn, AppState} from '../../../../types/reducers'

const mapStateToProps = (state: AppState, ownProps) => {
  const {namespace} = ownProps.version
  const {gtfs} = state
  const {filter, routes} = gtfs
  const {routeOffset} = filter
  const {data, fetchStatus} = routes.routeDetails

  return {
    fetchStatus,
    namespace,
    allRoutes: state.gtfs.routes.allRoutes,
    numRoutes: data ? data.numRoutes : 0,
    routeData: getRouteData(state),
    routeOffset
  }
}

const mapDispatchToProps = (dispatch: dispatchFn, ownProps) => {
  const {namespace} = ownProps.version
  return {
    onComponentMount: (fetched) => {
      if (!fetched) {
        dispatch(fetchRoutes(namespace))
        dispatch(fetchRouteDetails(namespace))
      }
    },
    routeDateTimeFilterChange: () => dispatch(fetchRouteDetails(namespace)),
    routeOffsetChange: (offset) => dispatch(routeOffsetChange({ namespace, offset })),
    viewPatterns: (routeId: ?string) => {
      dispatch(patternRouteFilterChange(namespace, routeId))
      ownProps.selectTab('patterns')
    },
    viewStops: (routeId: ?string) => {
      dispatch(patternRouteFilterChange(namespace, routeId))
      ownProps.selectTab('stops')
    },
    viewTrips: (routeId: ?string) => {
      dispatch(patternRouteFilterChange(namespace, routeId))
      ownProps.selectTab('timetables')
    }
  }
}

const Routes = connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteLayout)

export default Routes
