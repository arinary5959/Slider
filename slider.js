import Slider_H from "./slider_H.js"
console.log(Slider_H)

// 객체에 정리 어떻게??
      // controller는 어떻게?? - 정리된 contoller 객체와 객체의 value 변동에 따른 실행(함수?).

    //   const slider = document.querySelector(".slider");
    //   const slideimgs = document.querySelectorAll(".slider img");
      //button
      const prevBtn = document.querySelector(".prevBtn");
      const nextBtn = document.querySelector(".nextBtn");
      //roundbtn
      const roundBtn = document.querySelectorAll(".roundBtn");
      //autoplaybtn
      const playBtn = document.querySelector(".playBtn");
      const pauseBtn = document.querySelector(".pauseBtn");

      console.log(roundBtn);
      
      // 미니 슬라이더 기능은 몇 개 없다. 작게 만든 후 크게 키워보기...^^..!!
      Slider_H({
        el: ".slider", //클래스명으로 넣을지 아이디로 넣을지!
        // mode: horizontal', 'vertical', ('fade')
        auto: true,
        speed: 2000,

        // autoControl: true, false,
        // pager: true, false,
        // infinity : true, false,
      });