var birthDay = new Date(2016, 4, 23);

var pad = function(value) {
  return value < 10 ? '0' + value : '' + value;
};

var processTime = function(remainingTime) {
  var seconds = Math.round(remainingTime  / 1000);
  var days = Math.floor(seconds / (60*60*24));
  seconds -= (days*60*60*24);
  var hours = Math.floor(seconds / (60*60));
  seconds -= hours*60*60;
  var minutes = Math.floor(seconds / 60);
  seconds -= minutes*60;
  seconds = Math.floor(seconds);

  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds)
  };
}

var ProgressBar = React.createClass({
  render: function() {
    var className = 'c100 p' + this.props.percentage + ' big';

    return (
      <div className={className}>
        <span>{this.props.percentage}%</span>
        <div className="slice">
          <div className="bar"></div>
          <div className="fill"></div>
        </div>
      </div>
    );
  }
});

var Countdown = React.createClass({
  render: function() {
    return (
      <table>
        <thead>
          <tr>
            <td>Days</td>
            <td>Hours</td>
            <td>Minutes</td>
            <td>Seconds</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.props.time.days}</td>
            <td>{this.props.time.hours}</td>
            <td>{this.props.time.minutes}</td>
            <td>{this.props.time.seconds}</td>
          </tr>
        </tbody>
      </table>
    );
  }
});

var ExampleApplication = React.createClass({
  getStyle: function() {
    return {

    };
  },

  render: function() {
    return (
      <Countdown
        time={processTime(this.props.remaining)}
        style={this.getStyle()}
      />
    );
  }
});

setInterval(function() {
  ReactDOM.render(
    <ExampleApplication remaining={birthDay.getTime() - new Date().getTime()} />,
    document.getElementById('container')
  );
}, 1000);
