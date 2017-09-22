import React from 'react';

class Answers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false,
            classNames: ['', '', '', ''],
            confirmBtn: '',
            selectedAns: 0
        }

        this.checkAnswer = this.checkAnswer.bind(this);
        this.confirmAnswer = this.confirmAnswer.bind(this);
    }
    checkAnswer() {
        let { isAnswered } = this.props;
        if(!isAnswered) {
            // let elem = e.currentTarget;
            let { correct, increaseScore } = this.props;
            // let answer = Number(elem.dataset.id);
            let updatedClassNames = this.state.classNames;
            let answer = this.state.selectedAns;
            if(answer === correct){
                updatedClassNames[answer-1] = 'right';
                increaseScore();
            }
            else {
                updatedClassNames[answer-1] = 'wrong';
            }

            this.setState({
                classNames: updatedClassNames
            })

            this.props.showButton();
        }
    }

    shouldComponentUpdate() {
      let selectAnsFromParent = this.props.selectedAnsArray;
      let queNo = this.props.nr;
      console.log("selected question is: ",queNo);
      let selectedClassNames = ['', '', '', ''];
      // console.log("selected classnames after initial assign: ", selectedClassNames);
      let answerPosition;
      if(selectAnsFromParent.length != 0 && queNo != 0 && queNo < this.props.total) {
        if(selectAnsFromParent[queNo-1].ansIndex){
            answerPosition = selectAnsFromParent[queNo-1].ansIndex;
          }
        // console.log('inside if: ', selectAnsFromParent.length);

      for (var i = 0; i < selectedClassNames.length; i++) {
        selectedClassNames[i] == '';
      }
      selectedClassNames[answerPosition] = 'select';
        this.setState({
            classNames: selectedClassNames
        });
        // console.log("selected classnames after select assign: ", selectedClassNames);
      }
      // console.log("answer from parent is: ", selectAnsFromParent);
      // console.log("classnames are: ",selectedClassNames);
      //   console.log("answer positions are: ",answerPosition);
      //     console.log("selected questions are: ",queNo);

        return true;
    }
    confirmAnswer(e) {
      let elem = e.currentTarget;
      let { correct, increaseScore } = this.props;
      let answer = Number(elem.dataset.id);
      let updatedClassNames = this.state.classNames;
      for (var i = 0; i < updatedClassNames.length; i++) {
        updatedClassNames[i] = '';
      }
      updatedClassNames[answer-1] = 'select';
      this.setState({classNames: updatedClassNames, selectedAns: answer});
      let selectedAnswerValue = '';
      for (var i = 0; i < this.props.answers.length; i++) {
      if(answer == i+1) {
        selectedAnswerValue = this.props.answers[i];
        this.props.storeSelectedAns(selectedAnswerValue, i);
      }
      }
    }
    render() {
        let { answers } = this.props;
        let { classNames } = this.state;
        // let transition = {
        //     transitionName: "example",
        //     transitionEnterTimeout: 500,
        //     transitionLeaveTimeout: 300
        // }

        return (
            <div id="answers">
                <ul>
                    <li onClick={this.confirmAnswer} className={classNames[0]} data-id="1"><span>A</span> <p>{answers[0]}</p></li>
                    <li onClick={this.confirmAnswer} className={classNames[1]} data-id="2"><span>B</span> <p>{answers[1]}</p></li>
                    <li onClick={this.confirmAnswer} className={classNames[2]} data-id="3"><span>C</span> <p>{answers[2]}</p></li>
                    <li onClick={this.confirmAnswer} className={classNames[3]} data-id="4"><span>D</span> <p>{answers[3]}</p></li>
                </ul>
            </div>
        );
    }
}

module.exports = Answers;
