// 캔버스 세팅
let canvas;
let cts; // 그림 그려주는 역할
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

// 이미지 불러오는 함수 만들기
let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameoverImage;

// 게임오버
let gameOver = false // true면 게임 끝남

// 점수
let score = 0; 

// 우주선 좌표(계속 바뀌기 때문에)
let spaceshipX = canvas.width/2-32;
let spaceshipY = canvas.height-64;

// 총알
let bulletList = [] // 총알들을 저장하는 리스트

function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function() { // init : 초기화
    this.x = spaceshipX +6; // 우주선의 가운데에서 총알 발사
    this.y = spaceshipY;
    this.alive = true// 총알의 상태 => true면 살아있음 false면 죽음
    bulletList.push(this);
    };
  this.update = function() {
    this.y -= 6; // 총알 발사
  };

  this.checkHit = function() {
    for (let i = 0; i < enemyList.length; i++) {
      if (
        this.y <= enemyList[i].y && 
        this.x >= enemyList[i].x && 
        this.x <= enemyList[i].x + 40
        ) {
        // 총알이 죽으면 적군의 우주선이 없어짐 -> 점수 획득
        score++;
        this.alive = false; // 죽은 총알
        enemyList.splice(i, 1);
      }
    }
  };
}

// 적군
// 최대, 최소값 랜덤 반환
function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random()*(max-min+1))+min
  return randomNum
}

let enemyList = []

function Enemy() {
  this.x = 0;
  this.y = 0;
  this.init = function(){
    this.y = 0;
    this.x = generateRandomValue(0, canvas.width-66);
    enemyList.push(this);
  };
  this.update = function() {
    this.y += 5; // 적군 내려오는 속도 조절

    if (this.y >= canvas.height-48) {
      gameOver = true;
      console.log("gameover")
    }
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
  gameoverImage.src="images/gameoverbg.png";
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

// 총알 생성
function createBullet() {
  console.log("총알 생성");
  let b = new Bullet(); // 총알 하나 생성
  b.init();
  console.log("총알리스트",bulletList);
}

// 적군 생성 
function createEnemy() {
  // const interval = setInterval(호출하고 싶은 함수, 시간)
  const interval = setInterval(function(){
    let e = new Enemy()
    e.init()
  }, 1000); // 1초마다
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

  // 총알의 y좌표 업데이트하는 함수 호출
  for(let i = 0; i<bulletList.length; i++) {
    if (bulletList[i].alive) {
      bulletList[i].update();
    bulletList[i].checkHit();
    }
  };
  // 적군의 y좌표 업데이트하는 함수 호출
  for(let i = 0; i<enemyList.length; i++) {
    enemyList[i].update();
  };
}

// 이미지 보여주는 함수 만들기

function render(){
  // ctx.drawImage(Image, dx, dy, dWidth, dHeight)
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
  ctx.fillText(`score:${score}`, 20, 35);
  ctx.fillStyle = "White"
  ctx.font = "20px Arial"

  for(let i=0;i<bulletList.length;i++) {
    if (bulletList[i].alive) { // 총알이 살아있을 때만 보여줌
      ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
  };
  for(let i=0;i<enemyList.length;i++) {
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
  }
}

// 자기자신을 계속 호출
function main(){
  if(!gameOver) {
    update(); // 좌표값을 업데이트하고
    render(); // 그려주고
    // console.log("animation calls main function!!") 애니메이션이 계속 호출 되고 있음을 확인할 수 있음
    requestAnimationFrame(main);
  }else {
    ctx.drawImage(gameoverImage, 10, 100, 380, 380);
  };
}

// 함수 호출하기 => 웹사이트 시작하자마자
loadImage();
setupKeyboardLitstner();
createEnemy();
main();

// 우주선
// 1. 방향키를 누르면
// 2. 우주선의 xy 좌표가 바뀌고
// 3. 다시 render 그림

// 총알
// 1. 스페이스바를 누르면 총알 발사
// 2. 총알 발사 = 총알의 y값 --, 총알의 x값은? 스페이스를 누른 순간의 우주선의 x좌표
// 3. 발사된 총알들은 총알 배열에 저장
// 4. 모든 총알들은 x, y 좌표가 있어야 함
// 5. 총알 o배열을 가지고 render 그려줌

// 적군 만들기
// 1. 적군의 위치 랜덤
// 2. 적군은 밑으로 계속 내려옴
// 3. 1초마다 하나씩 적군 나옴
// 4. 적군의 우주선이 바닥에 닿으면 게임 오버
// 5. 적군과 총알이 만나면 우주선이 사라지고 점수 1점 획득

// 적군 죽는다
// 총알.y <= 적군.y
// 총알.x >= 적군.x and 총알.x <= 적군.x + 적군의 넓이 
// -> 닿았다 -> 총알이 죽음 =-> 적군의 우주선 없어짐 -> 점수 획득