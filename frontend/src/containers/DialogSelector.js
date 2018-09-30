import React from 'react'
import {connect} from 'react-redux'
import Chat from '../components/Chat/Chat'
import {getDialogsList, selectedDialog} from '../actions/dialogsActions';

const colors = {
    'Кошмары': "#967b0021",
    'Отношения': "#43960036",
    'Проблемы в семье': "#96000033",
    'Секс': "#00964136",
    'Одиночество': "#008a9636",
    'Кибербуллинг': "#31009636",
    'Суицид': "#96008636"
}

class DialogSelector extends React.Component {

   constructor(props) {
      super(props);
      this.onDialogClick = this.onDialogClick.bind(this)
   }

   componentDidMount() {
      const { dispatch } = this.props;
      dispatch(getDialogsList())
   }

   onDialogClick(event, dialog) {
      const {dispatch} = this.props;
      dispatch(selectedDialog(dialog.uuid))
   }

   render() {
      const dialogs = this.props.dialogs.map((item, index) => (
            <div key={item.uuid} 
                 onClick={e => this.onDialogClick(e, item)} 
                 className={item.uuid == this.props.selectedDialog ? 'selected' : ''}
                 style={{background: colors[item.theme]}}>
               <span>{item.theme || 'в процессе...'}</span>
            </div>
         )
      )
      return (
         <div className="dialogs-list">{dialogs}</div>
      )
   }
}

const mapStateToProps = state => {
   return {
      dialogs: state.dialogs.items,
      selectedDialog: state.dialogs.selectedDialog,
   }
}

DialogSelector = connect(mapStateToProps)(DialogSelector)

export default DialogSelector
