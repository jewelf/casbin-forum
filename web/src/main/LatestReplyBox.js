// Copyright 2020 The casbin Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from "react";
import * as Setting from "../Setting";
import * as ReplyBackend from "../backend/ReplyBackend";
import {withRouter} from "react-router-dom";
import Avatar from "../Avatar";

class LatestReplyBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      memberId: props.match.params.memberId,
      replies: []
    };
  }

  componentDidMount() {
    this.getLatestReplies();
  }

  getLatestReplies() {
    ReplyBackend.getLatestReplies(this.state.memberId, 10, 1)
      .then((res) => {
        this.setState({
          replies: res,
        });
      });
  }

  renderReplies(reply) {
    return (
      <div>
        <div className="dock_area">
          <table cellPadding="0" cellSpacing="0" border="0" width="100%">
            <tr>
              <td style={{padding: "10px 15px 8px 15px", fontSize: "12px", textAlign: "left"}}>
                <div className="fr"><span className="fade">{Setting.getPrettyDate(reply.replyTime)}</span></div>
                <span className="gray">replied <a href={`/member/${reply.author}`}> {reply.author} </a> 's topic <span
                  className="chevron">›</span> <a href={`/go/${reply.nodeId}`}> {reply.nodeName} </a>
                  <span className="chevron">›</span> <a href={`/t/${reply.topicId}`}> {reply.topicTitle} </a>
                </span>
              </td>
            </tr>
          </table>
        </div>
        <div className="inner">
          <div className="reply_content">
            <span dangerouslySetInnerHTML={{__html: reply.replyContent}} />
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="box">
        <div className="cell"><span className="gray">{`${this.state.memberId}'s latest replies`}</span></div>
        {
          this.state.replies.map((reply) => {
            return this.renderReplies(reply);
          })
        }
        <div className="inner">
          <span className="chevron">»</span> <a href={`/member/${this.state.memberId}/replies`}>{`${this.state.memberId}'s more replies`}</a></div>
      </div>
    );
  }
}

export default withRouter(LatestReplyBox);
    
