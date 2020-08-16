import React from "react";
import {
  Comment,
  Form,
  Button,
  Header,
  Icon,
  Pagination,
  Segment,
  Grid,
} from "semantic-ui-react";
import moment from "moment";
import _ from "lodash";

import { db } from "./fb.js";

import human from "./human.png";

function SingleComment(detail) {
  return (
    <Comment>
      <Comment.Content>
        <Comment.Avatar src={human} />
        <Comment.Author
          as="a"
          style={{ color: "paleTurquoise", marginLeft: "5px" }}
        >
          {detail.info.userName}
        </Comment.Author>
        <Comment.Metadata>
          <div style={{ color: "LemonChiffon" }}>{detail.info.time}</div>
        </Comment.Metadata>
        <Comment.Text style={{ color: "white", marginLeft: "40px" }}>
          {detail.info.content}
        </Comment.Text>{" "}
        <Comment.Actions>
          <Comment.Action
            style={{ color: "salmon", marginLeft: "40px" }}
            onClick={() => {
              if (
                detail.info.userName == detail.userName &&
                detail.userName != "방문자"
              ) {
                db.collection("comments")
                  .doc(detail.info.id)
                  .delete()
                  .then((res) =>
                    alert("삭제가 완료되었습니다! \n 새로고침해보세요")
                  );
              } else {
                alert("본인의 댓글만 삭제할수있어요..");
              }
            }}
          >
            삭제
          </Comment.Action>
          <Comment.Action
            style={{ color: "LightGreen", marginLeft: "10px" }}
            onClick={() => {
              if (
                detail.info.userName == detail.userName &&
                detail.userName != "방문자"
              ) {
                detail.selectComment(detail.index, detail.info.content, detail.info.id);
              } else {
                alert("본인의 댓글만 수정할수있어요..");
              }
            }}
          >
            수정
          </Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
}

class Comments extends React.Component {
  constructor() {
    super();
    this.state = {
      inputContent: "",
      inputTime: "",
      userName: "",
      inputid : "",
      commentsList: [],
      formLocation: -1,
    };
  }

  selectComment = (num, content, id) => {
    this.setState({ formLocation: num, inputContent: content, inputid : id });
  };

  componentDidMount = () => {
    db.collection("comments")
      .get()
      .then((ss) => {
        let comments = [];
        ss.forEach((doc) => {
          comments.push(Object.assign(doc.data(), { id: doc.id }));
        });
        return comments;
      })
      .then((res) => {
        this.setState({ commentsList: res });
      });
  };

  render() {
    console.log(this.state)
    return (
      <Comment.Group>
        <Header as="h3" dividing style={{ color: "white" }}>
          Comments
        </Header>
        {this.state.formLocation == -1 ? (
          <Form reply>
            <Form.TextArea
              value={this.state.inputContent}
              placeholder="댓글을 입력해주면 좋겟어요!"
              onChange={(e) => this.setState({ inputContent: e.target.value })}
            />
            <Button
              content="등록하기"
              labelPosition="left"
              icon="edit"
              primary
              onClick={() => {
                if (this.state.inputContent != "") {
                  this.setState(
                    (prevState) => {
                      let newComment = {
                        content: this.state.inputContent,
                        time: moment().format(
                          "YYYY년 MM월 DD일 HH시 mm분 ss초"
                        ),
                        userName: this.props.userName,
                      };

                      return {
                        commentsList: [...prevState.commentsList, newComment],
                        inputContent: "",
                      };
                    },
                    () =>
                      db
                        .collection("comments")
                        .add(
                          this.state.commentsList[
                            this.state.commentsList.length - 1
                          ]
                        )
                  );
                } else {
                  alert("내용을 입력해 주세요!");
                }
              }}
            />
          </Form>
        ) : null}

        {_.orderBy(this.state.commentsList, "time", "desc").map(
          (comments, index) => (
            <div style={{ padding: 10 }}>
              <SingleComment
                info={comments}
                userName={this.props.userName}
                selectComment={this.selectComment}
                index={index}
              />
              {this.state.formLocation == index ? (
                <Form reply style={{ padding: 10 }}>
                  <Form.TextArea
                    value={this.state.inputContent}
                    placeholder="댓글을 입력해주면 좋겟어요!"
                    onChange={(e) =>
                      this.setState({ inputContent: e.target.value })
                    }
                  />
                  <Button
                    content="수정하기"
                    labelPosition="left"
                    icon="edit"
                    secondary
                    onClick={() => {
                      if (this.state.inputContent != "") {
                        this.setState(
                          (prevState) => {
                            let newArr = _.filter(prevState.commentsList, (comments) => this.state.inputid != comments.id)
                            let newComment = {
                              content: this.state.inputContent,
                              time: moment().format(
                                "YYYY년 MM월 DD일 HH시 mm분 ss초"
                              ),
                              userName: this.props.userName,
                            };

                            return {
                              commentsList: [
                                ...newArr,
                                newComment,
                              ],
                              inputContent: "",
                              formLocation : -1
                            };
                          },
                          () =>
                            db
                              .collection("comments")
                              .doc(
                                this.state.inputid).update(this.state.commentsList[
                                  this.state.commentsList.length - 1
                                ]
                              ) )

                      } else {
                        alert("내용을 입력해 주세요!");
                      }
                    }}
                  />
                </Form>
              ) : null}
            </div>
          )
        )}
        <br />
        <Grid centered style={{ padding: 15 }}>
          <Pagination inverted totalPages={5} />
        </Grid>
      </Comment.Group>
    );
  }
}

export default Comments;
