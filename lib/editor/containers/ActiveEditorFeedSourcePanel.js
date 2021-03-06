import { connect } from 'react-redux'
import { fetchSnapshots, restoreSnapshot, deleteSnapshot, loadFeedVersionForEditing, downloadSnapshot, createSnapshot } from '../actions/snapshots.js'
import { createFeedVersionFromSnapshot } from '../../manager/actions/versions'

import EditorFeedSourcePanel from '../components/EditorFeedSourcePanel'

const mapStateToProps = (state, ownProps) => {
  const {user} = state
  return {
    user
  }
}

const mapDispatchToProps = {
  getSnapshots: fetchSnapshots,
  createSnapshot,
  restoreSnapshot,
  deleteSnapshot,
  downloadSnapshot,
  exportSnapshotAsVersion: createFeedVersionFromSnapshot,
  loadFeedVersionForEditing
}

const ActiveEditorFeedSourcePanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorFeedSourcePanel)

export default ActiveEditorFeedSourcePanel
