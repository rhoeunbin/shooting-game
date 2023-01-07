// 캔버스 세팅
let canvas;
let cts; // 그림 그려주는 역할
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

// 이미지 불러오는 함수 만들기
let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameoverImage;

// 우주선 좌표(계속 바뀌기 때문에)
let spaceshipX = canvas.width/2-32;
let spaceshipY = canvas.height-64;

let bulletlist = [] // 총알들을 저장하는 리스트

function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function(){ // init : 초기화
    this.x = spaceshipX +6; // 우주선의 가운데에서 총알 발사
    this.y = spaceshipY;
    bulletlist.push(this);
    };
  this.update = function() {
    this.y -= 7; // 총알 발사
  };
}

function loadImage(){
  backgroundImage = new Image();
  backgroundImage.src="images/spacebg.jpg";

  spaceshipImage = new Image();
  spaceshipImage.src="images/rockett.png";

  bulletImage = new Image();
  bulletImage.src="images/bulletbg.png";

  enemyImage = new Image();
  enemyImage.src="images/enemybg.png";

  gameoverImage = new Image();
  gameoverImage.src="images/gameoverbg.jpg";
}

let keysDown={}
function setupKeyboardLitstner(){
  // 키보드 누를 때
  document.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
    // console.log("무슨키가눌렸지?",event.keyCode)
    // console.log("키다운객체에 들어간 값은?",keysDown);
  })
  // 키보드에서 손 뗄 때
  document.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode]
    // console.log("버튼클릭후", keysDown);
    
    // 1. 스페이스바를 누르면 총알 발사
    // 키보드에서 손 뗄 때 실행되어야 하나씩 발사 가능
    if (event.keyCode == 32){
        createBullet(); // 총알 생성 함수
    }
  });
}

function createBullet() {
  console.log("총알 생성");
  let b = new Bullet(); // 총알 하나 생성
  b.init();
  console.log("총알리스트",bulletlist);
}

// 우주선이 오른쪽으로 간다 : x좌표 값 증가
// 우주선이 왼쪽으로 간다 : x좌표 값 감소

function update(){
  if ( 39 in keysDown) {
    spaceshipX += 5; // 우주선의 속도
  } // right
  if ( 37 in keysDown) {
    spaceshipX -= 5;
  } // left
  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }
  // if (spaceshipX >= canvas.width) {
  //   spaceshipX = canvas.width
  // } 이미지가 장 밖에서 그려지므로 안으로 불러와야 된다
  // 우주선의 좌표값이 무한대로 업데이트 X, 경기장 안에만 있게 하려면
  if (spaceshipX >= canvas.width - 64) {
    spaceshipX = canvas.width - 64;
  }

  // 총알의 y좌표 없데이트하는 함수 호출
  for(let i=0; i<bulletlist.length;i++) {
    bulletlist[i].update()
  };
}

// 이미지 보여주는 함수 만들기

function render(){
  // ctx.drawImage(Image, dx, dy, dWidth, dHeight)
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
  for(let i=0;i<bulletlist.length;i++) {
    ctx.drawImage(bulletImage, bulletlist[i].x, bulletlist[i].y);
  }
}

// 자기자신을 계속 호출
function main(){
  update(); // 좌표값을 업데이트하고
  render(); // 그려주고
  // console.log("animation calls main function!!") 애니메이션이 계속 호출 되고 있음을 확인할 수 있음
  requestAnimationFrame(main)
}

// 함수 호출하기
loadImage();
setupKeyboardLitstner();
update();
main();

// 방향키를 누르면
// 우주선의 xy 좌표가 바뀌고
// 다시 render 그림

// 총알 : space를 누를 때마다 y좌표가 변함 => 총알 리스트가 있어야 하고 render해야함 => class bullet이 있어야 함(function으로 할 예정)

// 총알 만들기
// 1. 스페이스바를 누르면 총알 발사
// 2. 총알 발사 = 총알의 y값 --, 총알의 x값은? 스페이스를 누른 순간의 우주선의 x좌표
// 3. 발사된 총알들은 총알 배열에 저장
// 4. 모든 총알들은 x, y 좌표가 있어야 함
// 5. 총알 o배열을 가지고 render 그려줌