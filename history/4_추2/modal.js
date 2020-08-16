import React from "react";
import {
Modal, Image, Header, Button
} from "semantic-ui-react";

class VisitorsModal extends React.Component {

  render(){
    return(<Modal
      open={this.props.isOpen}
    >
      <Modal.Header> 제 작품을 감상해주신 분들 </Modal.Header>
      <Modal.Content image>
        <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
        <Modal.Description>
          <Header>Google 로그인을 통해 접속해주셨어요!</Header>
          {this.props.visitorsList.map(name => <p>{`${name}님`} </p>)}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="방문해주셔서 감사합니다!"
          labelPosition='right'
          icon='checkmark'
          onClick={() =>this.props.closeModal()}
          positive
        />
      </Modal.Actions>
    </Modal>)
  }
}

export default VisitorsModal
