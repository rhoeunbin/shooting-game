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

// 이미지 보여주는 함수 만들기

function render(){
    // ctx.drawImage(Image, dx, dy, dWidth, dHeight)
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

// 자기자신을 계속 호출
function main(){
    render();
    // console.log("animation calls main function!!") 애니메이션이 계속 호출 되고 있음을 확인할 수 있음
    requestAnimationFrame(main)
}

// 함수 호출하기
loadImage();
main();