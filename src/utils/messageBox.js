import { MessageBox } from 'element-ui'

const alert = (message, type = '', title = '提示') => {
    return MessageBox.alert(message, title, {
        type: type
    });
}

const confirm = (message, type = '', title = '提示') => {
    return MessageBox.confirm(message, title, {
        type: type,
        cancelButtonClass: 'el-button--default',
        closeOnClickModal: false
    });
}

export default {
    alert,
    confirm
}