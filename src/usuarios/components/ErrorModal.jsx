import React from 'react';

import Modal from './Modal';
import {Button} from '@mui/material';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Un error ha ocurrido!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
