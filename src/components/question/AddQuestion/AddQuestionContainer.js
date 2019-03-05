/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Button, Tooltip, BackTop } from 'antd';
import { connect } from 'react-redux';
import QuestionModel from '../../../models/AppModel/Questions';
import { getQuestions } from '../../../actions/appActions/QuestionActions';
import TargetGroupAffix from './TargetGroupAffix';
import QuestionPanel from './QuestionPanel';
import './AddQuestions.scss';
import routes from '../../../utils/routes';


class AddQuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addQuestion: false,
    };
  }

  componentWillMount() {
    const { match } = this.props;
    getQuestions(match.params.targetID)
      .then((payload) => {
        QuestionModel.saveAll(payload.questions.map(question => new QuestionModel(question)));
      })
      .catch((e) => {
        // console.log(e);
      });
  }

  handleAddQuestionClick = (mode) => {
    const { history, match } = this.props;
    // console.log(mode)
    if (mode === 'Add') {
      history.push(`/admin/dashboard/${match.params.targetID}/questions/add`);
      return 0;
    }
    history.push(`/admin/dashboard/${match.params.targetID}/questions/edit/${123}`);
  }

  handleBackClick = () => {
    const { history } = this.props;
    history.push(routes.targetGroupList);
  }

  getAddBackButtons = () => (
    <div className="buttons">
      <div>
        <Tooltip title="Target Group">
          <Button
            onClick={this.handleBackClick}
            icon="arrow-left"
          />
        </Tooltip>
      </div>
      <div>
        <Tooltip title="Add question">
          <Button
            onClick={() => this.handleAddQuestionClick('Add')}
            icon="plus"
          />
        </Tooltip>
      </div>
    </div>
  );

  getQuestionList = () => <QuestionPanel {...this.props} />;

  getAffix = () => <TargetGroupAffix />

  getQuestions = () => (
    <div className="questions">
      {this.getQuestionList()}  
    </div>
  )

  render() {
    const { addQuestion } = this.state;

    return (
      <div
        className="question-container"
      >
        <BackTop />
        {this.getAffix()}
        {this.getAddBackButtons(addQuestion)}
        {this.getQuestions()}
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    questions: QuestionModel.list()[0] ? QuestionModel.list().map(item => item[1].props) : [],
  };
}


export default connect(mapStateToProps)(AddQuestionContainer);
