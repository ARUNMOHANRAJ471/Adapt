import React from 'react';
// import data from '../data/data';
import Answers from './Answers';
import {Dimmer, Card} from 'semantic-ui-react';
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nr: 0,
      total: 0,
      showButton: true,
      questionAnswered: false,
      score: 0,
      displayPopup: 'flex',
      active: true,
      answers: [],
      time: 'start',
      title: 'Welcome to Quiz',
      text: 'It\'s mandatory to attend all Questions.<br/><br/> Your answer will be recorded only once. So make sure you click the answer.',
      buttonText: 'Start the quiz',
      hideQues: "none",
      queData: [],
      showPrevButton: true,
      selectedAnsArray: []
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleShowButton = this.handleShowButton.bind(this);
    this.handleStartQuiz = this.handleStartQuiz.bind(this);
    this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
    this.popupHandle = this.popupHandle.bind(this);
    this.pushData = this.pushData.bind(this);
    this.pullData = this.pullData.bind(this);
    this.prevQuestion = this.prevQuestion.bind(this);
    this.storeSelectedAns = this.storeSelectedAns.bind(this);
  }
  storeSelectedAns(dataFromAnswer, index) {
    let selectedData = this.state.selectedAnsArray;
    // console.log("OOOOOOOOOOOOO",dataFromAnswer," ",this.state.nr);
    selectedData[this.state.nr-1] = {answer: dataFromAnswer, ansIndex: index};
    this.setState({selectedAnsArray: selectedData});
  }
  pushData(nr) {
    // console.log("nrrrrrrrrrrrrrr", nr);
    let res = this.state.queData;
  this.setState({
    question: res[nr].question,
    answers: [
      res[nr].answers[0], res[nr].answers[1], res[nr].answers[2], res[nr].answers[3]
    ],
    correct: res[nr].correct.low,
    nr: nr + 1,
    total: res.length
  },function() {
    console.log("after pressing next ques", this.state.nr);
  });

  }
  pullData(a) {
    // console.log("((((((()))))))", a);
    let nr = a-2;
    let res = this.state.queData;
  this.setState({
    question: res[nr].question,
    answers: [
      res[nr].answers[0], res[nr].answers[1], res[nr].answers[2], res[nr].answers[3]
    ],
    correct: res[nr].correct.low,
    nr: this.state.nr - 1,
    total: res.length
  });
  }
  nextQuestion() {
    let {nr, total, score} = this.state;
    if (nr === total) {
      this.setState({
          text: 'You have completed the quiz. <br /> You got: <strong>' + score + '</strong> out of <strong>' + total + '</strong> questions right.'
      }, function() {
        this.setState({displayPopup: 'flex'});
      });
    } else {
      this.pushData(nr);
      // this.setState({questionAnswered: false, showPrevButton: true});
    }
  }

  prevQuestion() {
    let {nr, total, score} = this.state;
    if (nr === 0) {
      this.setState({showPrevButton: false});
    } else {
      this.pullData(nr);
      this.setState({questionAnswered: false});
    }
  }

  componentWillMount() {
    let {nr} = this.state;
    let context = this;
    let ansArray = this.state.selectedAnsArray;
    $.ajax({
      url: '/userGame/getQuestions',
      type: 'POST',
      datatype: 'JSON',
      data: {
        stageId: 1611
      },
      success: function(res) {
        // console.log('the response is: ', res);
        // this.setState({stageData: res.records});
        // data = res;
        this.setState({queData: res}, function() {
            this.pushData(nr);
        });
      }.bind(this),
      error: function(err) {
        // console.log(err);
      }
    });
  }

  handleShowButton() {
    this.setState({showButton: true, questionAnswered: true})
  }

  handleStartQuiz() {
    this.setState({displayPopup: 'none', nr: 1, hideQues: 'block'});
  }

  handleIncreaseScore() {
    this.setState({
      score: this.state.score + 1
    });
  }
  popupHandle() {
    let {time} = this.state;

    if (time === 'start') {
      this.setState({time: 'end', title: 'Congratulations!', buttonText: 'Close'});

      this.handleStartQuiz();
    } else {
      this.setState({active: false});
    }
  }
  createMarkup(text) {
    return {__html: text};
  }
  render() {
    // console.log("_____________",this.state.selectedAnsArray);
    let {
      nr,
      total,
      question,
      answers,
      correct,
      showButton,
      showPrevButton,
      questionAnswered,
      displayPopup,
      score,
      selectedAnsArray
    } = this.state;
    let {title, text, buttonText, hideQues} = this.state;
    return (
      <Dimmer active={this.state.active}>
        <div className="popup-container" style={{display: displayPopup}}>
          <div className="container">
            <div className="col-md-8 col-md-offset-2">
              <div className="popup">
                <h1>{title}</h1>
                <p dangerouslySetInnerHTML={this.createMarkup(text)}/>
                <button className="fancy-btn" onClick={this.popupHandle}>{buttonText}</button>
              </div>
            </div>
          </div>
        </div>
        <Card style={{
          width: '100%',
          height: '100%',
          marginTop: '5%'
        }}>
          <div className="container" style={{display:this.state.hideQues}}>
            {/* <Icon name='cancel' onClick={this.closeDimmer} id='closeIconPosition'/> */}
            {/* <Popup style={{display: displayPopup}} score={score} total={total} startQuiz={this.handleStartQuiz}/> */}
            <div className="row" style={{
              marginTop: '10%'
            }}>
              <div className="col-lg-10 col-lg-offset-1">
                <div id="question">
                  <h4>Question {nr}/{total}</h4>
                  <p>{question}</p>
                </div>
                <Answers storeSelectedAns = {this.storeSelectedAns} nr={nr} selectedAnsArray = {selectedAnsArray} total={total} answers={answers} correct={correct} showButton={this.handleShowButton} isAnswered={questionAnswered} increaseScore={this.handleIncreaseScore}/>
                <div id="submit">
                  {showPrevButton
                    ? <button className="fancy-btn" onClick={this.prevQuestion}>Prev Question</button>
                    : null}
                  {showButton
                    ? <button className="fancy-btn" onClick={this.nextQuestion}>{nr === total
                          ? 'Finish quiz'
                          : 'Next question'}</button>
                    : null}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Dimmer>
    );
  }
};

module.exports = Main;
