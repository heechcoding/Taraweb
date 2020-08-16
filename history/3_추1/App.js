import React from "react";
import { Button, Image, Divider, Header, Icon, Grid } from "semantic-ui-react";

import Comments from "./comment.js";
import Buttons from "./buttons.js";

import ny from "./NY.jpg";

function App() {
  return (
    <div>
      <Grid centered>
        <Grid.Row>
          <Image src={ny} centered />
        </Grid.Row>
        <Grid.Row>
          <Buttons />
        </Grid.Row>
      </Grid>
      <br />

      <Divider horizontal >
        <Header as="h4">
          <Icon name="comment alternate" />
           댓글을 입력하세요
        </Header>
      </Divider>

      <Comments />
      <Divider horizontal>
        <Header as="h4">
          <Icon name="microchip" />
          Contact Me
        </Header>
      </Divider>
      <br />
      <div>
        <Grid centered>
          <Button circular color="facebook" icon="facebook" onClick = {()=> alert("준비중입니다.")} />
          <Button circular color="instagram" icon="instagram" onClick = {()=> window.open("https://www.instagram.com/heech912/")} />
          <Button
            circular
            color="youtube"
            icon="youtube"
            onClick={() =>
              window.open(
                "https://www.youtube.com/channel/UC7ue1pZBUYiz_S3OKE7g_cQ/featured?view_as=subscriber"
              )
            }
          />
          <Button circular color="google plus" icon="google plus" onClick = {()=> alert("준비중입니다.")} />
        </Grid>
      </div>
    </div>
  );
}

export default App;
