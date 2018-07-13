import { Message } from 'element-ui'

const success = (message) => {
    Message.success(message);
}

const warning = (message) => {
    Message.warning(message);
}

const info = (message) => {
    Message.info(message);
}

const error = (message) => {
    Message.error(message);
}

export default {
    success,
    warning,
    info,
    error
}