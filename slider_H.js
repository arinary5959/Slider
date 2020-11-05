//20.11.2작성
//고려사항
//html의 구조 - 기본 구조는 parent-child가 1단계이다. (ul-li, 혹은 div 안의 div)
//html의 구조와 css 상황 - 사용자가 자유롭게 사용할 수 있어야함. 
//사용자의 슬라이더이미지 묶음(ul-li 혹은 div 안의 div)을 다시 wrap으로 묶어주고 이전 및 다음 버튼 그리고 캐러설 버튼 그외 오토컨트롤러 등을 넣을 수 있도록 한다.
//wrap의 생성과 DOM을 뜯어서 안에 넣어주는 수행작업이 필요 (돔을 많이 건드리는 너무 지나친 행위는 아닐까?)
//htmlcollection nodelist 차이

//주의사항
//this를 많이 쓰지 않고 코드를 쓰는 법

export default function Slider_H(obj) {
  //돔선택 (기본 ul -li 의 부모-자식관계 --1계층 구조. div안의 div던지 마음대로.)
    class Slide_info {
      constructor(obj) {
        // console.log(obj);
        this.el = obj.el;
        this.auto = obj.auto;
        this.speed = obj.speed;
      }
      counter = 1; //카운터의 값은 계속 변경. 왜 #counter는 this.counter 시에 NaN으로 반환됨
      #slideimgs = "";
      start() {
        //start()의 정보구성 (basic Info)
        //최초실행, 기본정보의 구성(슬라이드 이미지를 복제한 후 붙여줌/ 도규먼트로드 시 첫번째 이미지를 보여줌)
        //
        this.autoOnOFF = this.auto; //set에 값 전달하기. 및 실행
        let list = this.getElDom.children; //$.getElDom를 이용하면 $호출은 재귀적일까? this와 $을 쓸 때의 차이점
        console.log(list)
        this.getElDom.prepend(list[list.length - 1].cloneNode(true)) //last를 앞에 붙여주고
        console.log(list)
        //list에 DOM의 변화가 실시간으로 반영됨. 
        this.getElDom.append(list[1].cloneNode(true));//first를 뒤에 붙여주어 원형의 띠가 도는 것처럼 흉내내지만 실제로 그렇지는 않음.
        this.slideimgs = this.getElDom.querySelectorAll(
          `${this.getElDom.children[0].nodeName}`
        ); //자식이 되는 노드네임으로 쿼리셀렉. 부모-자식의 1개 계층구조로만 만들면 선택할 수 있도록 한다 Ul-li // div-div 등등..
        this.slideimgs[0].classList.add("last");
        this.slideimgs[this.slideimgs.length - 1].classList.add("first");
        console.log(this.slideimgs)
        window.addEventListener("load", () => {
          let size = this.slideimgs[0].clientWidth;
          console.log(size);
          this.getElDom.style.transform = `translateX(${-(
            size * this.counter
          )}px)`; //clone된 last가 맨 앞에 있으므로 한개 뒤로 밀어준다.(로드되었을 때 1번 보여주기)
        });
        
      }
      get getElDom() {
        return document.querySelector(this.el);
      }
      set autoOnOFF(auto) {
        // console.log($)
        // console.log(this)
        if (auto === true || auto === undefined) {
          console.log("true입니다");
          setInterval(() => {
            this.nextSlide();
          }, this.speed);
          //auto의 입력값이 없는 디폴트는 undefined, 자동으로 슬라이드가 움직이는 것이 기본값이다.
        } else if (auto === false) return;
      }
      nextSlide() {
        // console.log($)
        console.log(this.slideimgs)

        //autoplay가 일어나는 영역이면서 button에 의해서 함수가 실행될 부분. 그런데 아래의 이벤트 효과도 함께 기능해야함
        //autoplay가 false이면서 button에 의해 실행 가능해야함
        if (this.counter >= this.slideimgs.length - 1) return;
        let size = this.slideimgs[0].clientWidth;
        this.getElDom.style.transition = "transform 0.5s ease-in-out";
        this.getElDom.style.transform = `translateX(${
          -size * (this.counter + 1)
        }px)`; //클론된 last의 값만큼 하나 더해주어 움직이게 한다.(현재밀려난 값에 더해지는 것이 아니라 최종값을 입력하는 것이므로 1개가 자기 앞에 붙어있으니까 그 만큼을 더해주어 밀어내야한다)
        this.counter++; //카운터 갯수를 증가시켜준다.
        // console.log(this.counter + "이전");

        //거의 상시 실행되어야함. 원형고리처럼 보이도록 하는 애 
        this.getElDom.addEventListener("transitionend", () => {
          if (this.slideimgs[this.counter].classList.contains("last")) {
            let size = this.slideimgs[0].clientWidth;
            this.getElDom.style.transition = "none";
            console.log(this.counter + "none");
            this.counter = this.slideimgs.length - 2; // 6-2 = 4 (마지막) 클론된 애 말고 본래 마지막으로 보내주기
            this.getElDom.style.transform = `translateX(${
              -size * this.counter
            }px)`;
          } 
          if (this.slideimgs[this.counter].classList.contains("first")) {
            let size = this.slideimgs[0].clientWidth;
            this.getElDom.style.transition = "none";
            //   console.log(this.counter + "none");
            this.counter = this.slideimgs.length - this.counter; //6-5 = 1 클론된 애 말로 본래 첫번째 사진으로 보내주기 (이 때 카운터 값(===배열인덱스)을 수정해주는 것)
            this.getElDom.style.transform = `translateX(${
              -size * this.counter
            }px)`;
          }
        });
      }
    }
    const $ = new Slide_info(obj);
    $.start();
    // $.getEl();
    console.log($.slideimgs);
  }