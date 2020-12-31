const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

//获取ticketprice 并把string类型改成 number类型
let ticketPrice = +movieSelect.value; //

//保存选中电影的序号的价格
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//更新总数和总价格
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  //map会返回一个新数组，foreach不糊返回任何东西
  //indexOf 返回序号
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  //把已经选择的座位复制一份，放到数组当中

  //map这个数组

  //返回一个新的array的序号
  //localStorage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}
//从localStorage中选择数据，然后展示在UI当中
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex != null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//电影点击事件
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// seat 点击事件
container.addEventListener('click', e => {
  //选择并未被occupied的seat
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});
//初始化座位总数，以及价格
updateSelectedCount();
