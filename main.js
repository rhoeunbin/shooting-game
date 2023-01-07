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
let spaceshipX = canvas.width/2-32
let spaceshipY = canvas.height-64

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
    document.addEventListener("keydown",function(event){
        keysDown[event.keyCode] = true;
        // console.log("무슨키가눌렸지?",event.keyCode)
        console.log("키다운객체에 들어간 값은?",keysDown);
    })
    // 키보드에서 손 뗄 때
    document.addEventListener("keyup",function(event){
        delete keysDown[event.keyCode]
        console.log("버튼클릭후", keysDown);
    })
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
    //     spaceshipX = canvas.width
    // } 이미지가 장 밖에서 그려지므로 안으로 불러와야 된다
    if (spaceshipX >= canvas.width - 64) {
        spaceshipX = canvas.width - 64;
    }
    // 우주선의 좌표값이 무한대로 업데이트 X, 경기장 안에만 있게 하려면
}


// 이미지 보여주는 함수 만들기

function render(){
    // ctx.drawImage(Image, dx, dy, dWidth, dHeight)
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
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