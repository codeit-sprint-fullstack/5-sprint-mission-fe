


//JS 
const INPUTDATA = document.querySelector('#UserEmail');
const INPUTDATATEXT = document.querySelector('#EmailE');
const INPUTPW = document.querySelector('#PassWord');
const INPUTPWTEXT = document.querySelector('#PassWordE');
const LOGBUTTON = document.querySelector('#Loginbn');



const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
]

// 인풋박스 포커스 로그인화면

let toggleEmail = 0;
let togglePwd = 0;

// 버튼 활성화 여부를 결정하는 함수
function judgeBtn() {
    if (toggleEmail === 1 && togglePwd === 1) {
        LOGBUTTON.classList.add('blueLoginButton');
        LOGBUTTON.addEventListener('click',() => {

            let judgeEmail = false;
            let judgePwd = false;
            for (let i = 0; i < USER_DATA.length; i++){
                if (USER_DATA[i].email === INPUTDATA.value){
                    judgeEmail = true;
                    break;
                }}
            for (let i = 0; i < USER_DATA.length; i++){
                if (USER_DATA[i].password === INPUTPW.value){
                    judgePwd = true;
                    break;
                }}

            if (judgeEmail === false && judgePwd === true){
                window.alert("이메일이 일치하지 않습니다.");
                
            } else if (judgeEmail === true && judgePwd === false) {
                window.alert("비밀번호가 일치하지 않습니다.");
                
            } else if(judgeEmail === false && judgePwd === false) {
                window.alert("회원정보를 확인해주세요.");
            
            } else {
                // window.location.href = "/items.html";
                window.open("/items.html");
            }
        });

    } else {
        LOGBUTTON.classList.remove('blueLoginButton');
    }
};


const InputEmail=(event)=>{
    const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailpattern.test(event);
};


INPUTDATA.addEventListener('focusout',function(event) {
        if (event.target.value === ''){
            event.target.classList.add('Error')
            INPUTDATATEXT.textContent = '이메일을 입력해주세요.';
            toggleEmail = 0;
            judgeBtn();

        } else if (!InputEmail(event.target.value)){
            event.target.classList.add('Error')
            INPUTDATATEXT.textContent = '잘못된 이메일 형식입니다.';
            toggleEmail = 0;
            judgeBtn();

        } else {
            event.target.classList.remove('Error')
            INPUTDATATEXT.textContent = '';
            toggleEmail = 1;
            judgeBtn();
        }
                
});


INPUTPW.addEventListener('focusout',function(event) {
        if (event.target.value === ''){
            event.target.classList.add('Error')
            INPUTPWTEXT.textContent = '비밀번호를 입력해주세요.';
            togglePwd = 0;
            judgeBtn();

        } else if (event.target.value.length < 8 ) {
            event.target.classList.add('Error')
            INPUTPWTEXT.textContent = '비밀번호를 8자 이상 입력해주세요.';
            togglePwd = 0;
            judgeBtn();
            

        } else {
            event.target.classList.remove('Error')
            INPUTPWTEXT.textContent = '';
            togglePwd = 1;
            judgeBtn();
        }
});





