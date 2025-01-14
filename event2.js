

const NEWINPUTDATA = document.querySelector('#UserEmailNew');
const NEWINPUTDATATEXT = document.querySelector('#UserEmailNewE');
const NEWINPUTNAME = document.querySelector('#NicknameNew');
const NEWINPUTPW = document.querySelector('#PassWordNew');
const NEWINPUTPWTEXT = document.querySelector('#PassWordNewE');
const NEWINPUTPWE = document.querySelector('#PassWordreNew');
const NEWINPUTPWETEXT = document.querySelector('#PassWordreNewE');
const NEWLOGBUTTON = document.querySelector('#LoginbnNew');


const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
]



// 인풋박스 포커스 회원가입화면
const NewInputEmail=(event)=>{
    const Newemailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return Newemailpattern.test(event);
};

let NewtoggleEmail = 0;
let NewtogglePwd = 0;
let NewtogglePwde = 0;

NEWINPUTDATA.addEventListener('focusout',function(event) {
        if (event.target.value === ''){
            event.target.classList.add('Error')
            NEWINPUTDATATEXT.textContent = '이메일을 입력해주세요.';
            NewtoggleEmail = 0;
            NewjudgeBtn();

        } else if (!NewInputEmail(event.target.value)){
            event.target.classList.add('Error')
            NEWINPUTDATATEXT.textContent = '잘못된 이메일 형식입니다.';
            NewtoggleEmail = 0;
            NewjudgeBtn();

        } else {
            event.target.classList.remove('Error')
            NEWINPUTDATATEXT.textContent = '';
            NewtoggleEmail = 1;
            NewjudgeBtn();
        }
                
});



NEWINPUTPW.addEventListener('focusout',function(event) {
        if (event.target.value === ''){
            event.target.classList.add('Error')
            NEWINPUTPWTEXT.textContent = '비밀번호를 입력해주세요.';
            NewtogglePwd = 0;
            NewjudgeBtn();

        } else if (event.target.value.length < 8 ) {
            event.target.classList.add('Error')
            NEWINPUTPWTEXT.textContent = '비밀번호를 8자 이상 입력해주세요.';
            NewtogglePwd = 0;
            NewjudgeBtn();
            

        } else {
            event.target.classList.remove('Error')
            NEWINPUTPWTEXT.textContent = '';
            NewtogglePwd = 1;
            NewjudgeBtn();
        }
});



NEWINPUTPWE.addEventListener('focusout',function(event) {
    if (event.target.value === ''){
        event.target.classList.add('Error')
        NEWINPUTPWETEXT.textContent = '비밀번호를 입력해주세요.';
        NewtogglePwde = 0;
        NewjudgeBtn();

    } else if (event.target.value !== NEWINPUTPW.value ) {
        event.target.classList.add('Error')
        NEWINPUTPWETEXT.textContent = '비밀번호가 일치하지 않습니다.';
        NewtogglePwde = 0;
        NewjudgeBtn();
        
    } else {
        event.target.classList.remove('Error')
        NEWINPUTPWETEXT.textContent = '';
        NewtogglePwde = 1;
        NewjudgeBtn();
    }
});


// 회원가입버튼 활성화 여부를 결정하는 함수
function NewjudgeBtn() {
    if (NewtoggleEmail === 1 && NewtogglePwd === 1 && NewtogglePwde === 1) {
        NEWLOGBUTTON.classList.add('blueLoginButton');
        NEWLOGBUTTON.addEventListener('click',() => {

            let NewjudgeEmail = false;

            for (let i = 0; i < USER_DATA.length; i++){
                if (USER_DATA[i].email === NEWINPUTDATA.value){
                    NewjudgeEmail = true;
                    break;
                }}

            if (NewjudgeEmail === true) {
                window.alert("사용 중인 이메일입니다.");

            } else {
                // window.location.href = "/items.html";
                window.open("login.html");
            }
        });

        
    } else {
        LOGBUTTON.classList.remove('blueLoginButton');
    }
};
