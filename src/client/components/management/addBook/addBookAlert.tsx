import { connect } from 'react-redux'
import { Alert } from '../../common/alert'
import { AppState } from '../../../state'

const mapStateToProps = (state: AppState) => ({
  alertMessage: state.manage.addBook.alertMessage.alertText,
  bsStyle: state.manage.addBook.alertMessage.alertStyle
})

export const AddBookAlert = connect(mapStateToProps)(Alert);