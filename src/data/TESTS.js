export const TESTS = [
  // personalColor
  {
    info: {
      mainTitle: "퍼스널 컬러 테스트",
      subTitle: "나에게 어울리는 컬러는 무엇일까?",
      mainUrl: "personalColor",
      scoreType: "MBTI",
      mainImage:
        "https://www.dropbox.com/scl/fi/u4moi8xe7wme1ao796ujw/personalColor-intro.png?rlkey=qn2igicxafksekjx9fsnukk9z&st=ifpx4r50&dl=1",
      thumbImage:
        "https://www.dropbox.com/scl/fi/9iqe0gypnnclo5elt3hpi/personalColor-thumb.png?rlkey=m9uwdd6xww0v66g2gjo2688jz&st=ut5c22fv&dl=1",
      lang: "Kor",
      category: "characteristic",
    },
    questions: [
      {
        which: "EI",
        question: "처음 보는 친구들에게 나는?",
        answers: [
          {
            type: "E",
            content: "내가 먼저 말을 건낸다.",
          },
          {
            type: "I",
            content: "대부분 다른 친구가 먼저 말을 건낸다.",
          },
        ],
      },
      {
        which: "EI",
        question: "주말에 난?",
        answers: [
          {
            type: "E",
            content: "사람들과 만나는 것을 즐긴다.",
          },
          {
            type: "I",
            content: "혼자 있는 게 싫지 않은 편이다.",
          },
        ],
      },
      {
        which: "EI",
        question: "친구들과 놀 때 나는?",
        answers: [
          {
            type: "E",
            content: "왁자지껄한 신나는 분위기를 좋아한다.",
          },
          {
            type: "I",
            content: "소수의 친구들과 소소하게 대화하는 것을 좋아한다. ",
          },
        ],
      },
      {
        which: "SN",
        question: "내가 더 중요하게 생각하는 것은?",
        answers: [
          {
            type: "S",
            content: "현재가 없으면 미래도 없다.",
          },
          {
            type: "N",
            content: "미래를 생각하지 않으면 발전이 없다.",
          },
        ],
      },
      {
        which: "SN",
        question: "일할 때 나는?",
        answers: [
          {
            type: "S",
            content: "남들이 하는 대로 따라 가는 것이 좋다.",
          },
          {
            type: "N",
            content: "스스로 나만의 방법을 만드는 게 좋다. ",
          },
        ],
      },
      {
        which: "SN",
        question: "주변 사람들이 나에게 하는 말은?",
        answers: [
          {
            type: "S",
            content: "꾸준하고 참을성이 있다는 말을 자주한다.",
          },
          {
            type: "N",
            content: "창의적이고 독창적이라는 말을 자주한다.",
          },
        ],
      },
      {
        which: "TF",
        question: "거절해야 하는 상황이 오면 나는?",
        answers: [
          {
            type: "T",
            content: "강력하게 할 수 없다고 말한다.",
          },
          {
            type: "F",
            content: "고민하다가 대부분 들어주는 편이다.",
          },
        ],
      },
      {
        which: "TF",
        question: "화났을 때 나는?",
        answers: [
          {
            type: "T",
            content: "논리적으로 잘 말하면서 따진다. ",
          },
          {
            type: "F",
            content: "할말이 많지만 너무 분해서 눈물부터 난다.",
          },
        ],
      },
      {
        which: "TF",
        question:
          "고민을 얘기하는 친구, 듣다 보니 친구의 잘못인 것 같다. 그럴 때 나는?",
        answers: [
          {
            type: "T",
            content: "친구의 잘못된 점을 말해준다.",
          },
          {
            type: "F",
            content: "직접적으로 말하면 친구가 그래 할까봐 돌려 말한다.",
          },
        ],
      },
      {
        which: "JP",
        question: "준비물을 준비할 때 나는?",
        answers: [
          {
            type: "J",
            content: "하루 전 날 미리 준비한다.",
          },
          {
            type: "P",
            content: "‘내일 챙겨야지’ 하다가 까먹고 놓고 오는 일이 많다.",
          },
        ],
      },
      {
        which: "JP",
        question:
          "끝나고 집에 가서 공부하려 했는데, 친구들이 놀자고 붙잡는다. 나는?",
        answers: [
          {
            type: "J",
            content: "계획에 없던 일인데…매우 당황스럽다.",
          },
          {
            type: "P",
            content: "오케이! 역시 계획대로 안 되는 것이 인생! 놀자!!!!",
          },
        ],
      },
      {
        which: "JP",
        question: "내가 가고싶은 여행지 스타일은?",
        answers: [
          {
            type: "J",
            content:
              "내가 계획한대로! 계획적으로 일의 순서대로 진행하는 것을 좋아해!",
          },
          {
            type: "P",
            content:
              "그때그때 생각나는 대로 일 처리! 융통성 있게 하는 것을 좋아해!",
          },
        ],
      },
    ],
    results: [
      {
        type: "ESTJ",
        query: "ESTJ",
        img_src:
          "https://www.dropbox.com/scl/fi/5lhbern3h5b8w7ui6sssu/ESTJ.png?rlkey=bjudaghu8hm4d5ohgo24v3mbj&st=uy87vrg6&dl=1",
      },
      {
        type: "ESTP",
        query: "ESTP",
        img_src:
          "https://www.dropbox.com/scl/fi/8ytg6oypu645x0qpcfemt/ESTP.png?rlkey=in97p7velqy191srwufft1vs1&st=1pkilt92&dl=1",
      },
      {
        type: "ESFJ",
        query: "ESFJ",
        img_src:
          "https://www.dropbox.com/scl/fi/d91sjo51emt7y3stj7hbg/ESFJ.png?rlkey=xgxmki7qiwn4i0hdwj3vuhzsi&st=ethsiyxr&dl=1",
      },
      {
        type: "ESFP",
        query: "ESFP",
        img_src:
          "https://www.dropbox.com/scl/fi/r0vzqjgrqo0wj3u71uhk4/ESFP.png?rlkey=jadq00urhuwy7y9ag15o87p16&st=wdrn9n3d&dl=1",
      },
      {
        type: "ENTJ",
        query: "ENTJ",
        img_src:
          "https://www.dropbox.com/scl/fi/22icyye1317a1w1397z8q/ENTJ.png?rlkey=kavn4ijsa6q08adtwab18ylnj&st=icaonefg&dl=1",
      },
      {
        type: "ENTP",
        query: "ENTP",
        img_src:
          "https://www.dropbox.com/scl/fi/v05pict18syeudgdpzawc/ENTP.png?rlkey=7sj9z64pz5498hx6dpkpugpj0&st=kdcy2vwz&dl=1",
      },
      {
        type: "ENFJ",
        query: "ENFJ",
        img_src:
          "https://www.dropbox.com/scl/fi/e7m4ja909vw52jonqz2p3/ENFJ.png?rlkey=boxstq35qpqvre21aahwtxjif&st=9f4mv24e&dl=1",
      },
      {
        type: "ENFP",
        query: "ENFP",
        img_src:
          "https://www.dropbox.com/scl/fi/84up1wzeh3o92h3ndyyhy/ENFP.png?rlkey=az1j3kjxbbeqfxgc2ieb1e4uu&st=kcacavzx&dl=1",
      },
      {
        type: "ISTJ",
        query: "ISTJ",
        img_src:
          "https://www.dropbox.com/scl/fi/6nm4iwpja8ckf013l1fxm/ISTJ.png?rlkey=7hnj0pxcaeeq1nkmvlkjq0ihj&st=0dkq6mrp&dl=1",
      },
      {
        type: "ISTP",
        query: "ISTP",
        img_src:
          "https://www.dropbox.com/scl/fi/0xcrdzoe86vwug5xr16i0/ISTP.png?rlkey=mxow3zwad1vw74j1bqw0obvk7&st=w8baagct&dl=1",
      },
      {
        type: "ISFJ",
        query: "ISFJ",
        img_src:
          "https://www.dropbox.com/scl/fi/wtifdrfjb57kcarf5qk9m/ISFJ.png?rlkey=w1p61ver9kth4pfesbbda2u12&st=xm0f3xq1&dl=1",
      },
      {
        type: "ISFP",
        query: "ISFP",
        img_src:
          "https://www.dropbox.com/scl/fi/aj8oj1er6b3ouwisn5uk2/ISFP.png?rlkey=v9okq1di9twtwxnw9ln3t160x&st=pr0zx4w6&dl=1",
      },
      {
        type: "INTJ",
        query: "INTJ",
        img_src:
          "https://www.dropbox.com/scl/fi/ms3hxuc03g2ye9cl71ec1/INTJ.png?rlkey=nuadpr0hv3yfglfqerog5cejw&st=gao0ony6&dl=1",
      },
      {
        type: "INTP",
        query: "INTP",
        img_src:
          "https://www.dropbox.com/scl/fi/to767xowr0fdwsp6896hv/INTP.png?rlkey=ehr8lpihjmsiepxlp5kdcxkel&st=38hrud5l&dl=1",
      },
      {
        type: "INFJ",
        query: "INFJ",
        img_src:
          "https://www.dropbox.com/scl/fi/ak707z5pnsc2ng36z5s93/INFJ.png?rlkey=dm6qvh8bzdho49bikhi3msp45&st=ksw315sz&dl=1",
      },
      {
        type: "INFP",
        query: "INFP",
        img_src:
          "https://www.dropbox.com/scl/fi/ap8zax8x2g1zabq7ydhze/INFP.png?rlkey=ez9gqtmjkgo1j8ko3shgdihqn&st=gvd5a7xd&dl=1",
      },
    ],
  },
  // personalColorEng
  {
    info: {
      mainTitle: "Personal Color Test",
      subTitle: "What is the color that suits me?",
      mainUrl: "personalColorEng",
      scoreType: "MBTI",
      mainImage:
        "https://www.dropbox.com/scl/fi/jmihoko6rjpk0d3rgewsr/personalColorEng-intro.png?rlkey=ifyyqa8m4w44vq1nk08fshhnj&st=n42rl4fc&dl=1",
      thumbImage:
        "https://www.dropbox.com/scl/fi/x2b3tms9ml6kbz3vcot9h/personalColorEng-thumb.png?rlkey=alaxfwbswgfn34xao2zm99a84&st=zvw3w510&dl=1",
      lang: "Eng",
      category: "characteristic",
    },
    questions: [
      {
        which: "EI",
        question: "처음 보는 친구들에게 나는?",
        answers: [
          {
            type: "E",
            content: "내가 먼저 말을 건낸다.",
          },
          {
            type: "I",
            content: "대부분 다른 친구가 먼저 말을 건낸다.",
          },
        ],
      },
      {
        which: "EI",
        question: "주말에 난?",
        answers: [
          {
            type: "E",
            content: "사람들과 만나는 것을 즐긴다.",
          },
          {
            type: "I",
            content: "혼자 있는 게 싫지 않은 편이다.",
          },
        ],
      },
      {
        which: "EI",
        question: "친구들과 놀 때 나는?",
        answers: [
          {
            type: "E",
            content: "왁자지껄한 신나는 분위기를 좋아한다.",
          },
          {
            type: "I",
            content: "소수의 친구들과 소소하게 대화하는 것을 좋아한다. ",
          },
        ],
      },
      {
        which: "SN",
        question: "내가 더 중요하게 생각하는 것은?",
        answers: [
          {
            type: "S",
            content: "현재가 없으면 미래도 없다.",
          },
          {
            type: "N",
            content: "미래를 생각하지 않으면 발전이 없다.",
          },
        ],
      },
      {
        which: "SN",
        question: "일할 때 나는?",
        answers: [
          {
            type: "S",
            content: "남들이 하는 대로 따라 가는 것이 좋다.",
          },
          {
            type: "N",
            content: "스스로 나만의 방법을 만드는 게 좋다. ",
          },
        ],
      },
      {
        which: "SN",
        question: "주변 사람들이 나에게 하는 말은?",
        answers: [
          {
            type: "S",
            content: "꾸준하고 참을성이 있다는 말을 자주한다.",
          },
          {
            type: "N",
            content: "창의적이고 독창적이라는 말을 자주한다.",
          },
        ],
      },
      {
        which: "TF",
        question: "거절해야 하는 상황이 오면 나는?",
        answers: [
          {
            type: "T",
            content: "강력하게 할 수 없다고 말한다.",
          },
          {
            type: "F",
            content: "고민하다가 대부분 들어주는 편이다.",
          },
        ],
      },
      {
        which: "TF",
        question: "화났을 때 나는?",
        answers: [
          {
            type: "T",
            content: "논리적으로 잘 말하면서 따진다. ",
          },
          {
            type: "F",
            content: "할말이 많지만 너무 분해서 눈물부터 난다.",
          },
        ],
      },
      {
        which: "TF",
        question:
          "고민을 얘기하는 친구, 듣다 보니 친구의 잘못인 것 같다. 그럴 때 나는?",
        answers: [
          {
            type: "T",
            content: "친구의 잘못된 점을 말해준다.",
          },
          {
            type: "F",
            content: "직접적으로 말하면 친구가 그래 할까봐 돌려 말한다.",
          },
        ],
      },
      {
        which: "JP",
        question: "준비물을 준비할 때 나는?",
        answers: [
          {
            type: "J",
            content: "하루 전 날 미리 준비한다.",
          },
          {
            type: "P",
            content: "‘내일 챙겨야지’ 하다가 까먹고 놓고 오는 일이 많다.",
          },
        ],
      },
      {
        which: "JP",
        question:
          "끝나고 집에 가서 공부하려 했는데, 친구들이 놀자고 붙잡는다. 나는?",
        answers: [
          {
            type: "J",
            content: "계획에 없던 일인데…매우 당황스럽다.",
          },
          {
            type: "P",
            content: "오케이! 역시 계획대로 안 되는 것이 인생! 놀자!!!!",
          },
        ],
      },
      {
        which: "JP",
        question: "내가 가고싶은 여행지 스타일은?",
        answers: [
          {
            type: "J",
            content:
              "내가 계획한대로! 계획적으로 일의 순서대로 진행하는 것을 좋아해!",
          },
          {
            type: "P",
            content:
              "그때그때 생각나는 대로 일 처리! 융통성 있게 하는 것을 좋아해!",
          },
        ],
      },
    ],
    results: [
      {
        type: "ESTJ",
        query: "ESTJ",
        img_src:
          "https://www.dropbox.com/scl/fi/7jyylkbnew8w67sadxwf3/ESTJ.png?rlkey=x28ejf7fphxcknxgrox4jt0xi&st=gi6jplvf&dl=1",
      },
      {
        type: "ESTP",
        query: "ESTP",
        img_src:
          "https://www.dropbox.com/scl/fi/69zj9tuprhhhawqh3vb3p/ESTP.png?rlkey=3qzxrw45bbweszae5ujug6jrf&st=fp9olors&dl=1",
      },
      {
        type: "ESFJ",
        query: "ESFJ",
        img_src:
          "https://www.dropbox.com/scl/fi/d91sjo51emt7y3stj7hbg/ESFJ.png?rlkey=xgxmki7qiwn4i0hdwj3vuhzsi&st=ethsiyxr&dl=1",
      },
      {
        type: "ESFP",
        query: "ESFP",
        img_src:
          "https://www.dropbox.com/scl/fi/4en5qkoku1gdhqcy94gbn/ESFJ.png?rlkey=yysnrrp2292gb6v933lrn8od9&st=xzvb06i0&dl=1",
      },
      {
        type: "ENTJ",
        query: "ENTJ",
        img_src:
          "https://www.dropbox.com/scl/fi/d6yk934zbz3skyuzqx2uh/ENTJ.png?rlkey=ww8y9oig2cjvgedolhlzlydc4&st=zkhwom3a&dl=1",
      },
      {
        type: "ENTP",
        query: "ENTP",
        img_src:
          "https://www.dropbox.com/scl/fi/nocstuf0kek8vqwof04kr/ENTP.png?rlkey=jhzncfwwge0vm0prc9z1q1us8&st=3nbx8feg&dl=1",
      },
      {
        type: "ENFJ",
        query: "ENFJ",
        img_src:
          "https://www.dropbox.com/scl/fi/mz9xj0eiun4y0wyk6i68b/ENFJ.png?rlkey=a27hkov12q2jnh5afjpcb4vf8&st=0pwukbac&dl=1",
      },
      {
        type: "ENFP",
        query: "ENFP",
        img_src:
          "https://www.dropbox.com/scl/fi/ytgc86i5mxjiynwrm4mfw/ENFP.png?rlkey=tomxuobmmpl9fma9ng67pw2d8&st=o0m2tssj&dl=1",
      },
      {
        type: "ISTJ",
        query: "ISTJ",
        img_src:
          "https://www.dropbox.com/scl/fi/0uwl1mzly1mwi0fsu0acz/ISTJ.png?rlkey=nnbk0rn8w7di6iw7ipybpwwey&st=ra2mod39&dl=1",
      },
      {
        type: "ISTP",
        query: "ISTP",
        img_src:
          "https://www.dropbox.com/scl/fi/6clhx19z1c0l04ulxf5y2/ISTP.png?rlkey=4fwnw6cebeekdvgq3i2hlgsl1&st=k789fxan&dl=1",
      },
      {
        type: "ISFJ",
        query: "ISFJ",
        img_src:
          "https://www.dropbox.com/scl/fi/nrhs5u9dgk6w1gs90wkvv/ISFJ.png?rlkey=jxgftwx5hwg088zsbutxbqlgq&st=bi2ywew2&dl=1",
      },
      {
        type: "ISFP",
        query: "ISFP",
        img_src:
          "https://www.dropbox.com/scl/fi/wdnx56kbkdal04nn6364w/ISFP.png?rlkey=5jyfp2x3dcsasjdqraviuqzcg&st=0g9zrn2z&dl=1",
      },
      {
        type: "INTJ",
        query: "INTJ",
        img_src:
          "https://www.dropbox.com/scl/fi/hti638rqyby82gguj01z8/INTJ.png?rlkey=ijtbi4hh45dysynn3h6q3k9rg&st=trmrqhry&dl=1",
      },
      {
        type: "INTP",
        query: "INTP",
        img_src:
          "https://www.dropbox.com/scl/fi/nbena5wf4wuok93tftaxy/INTP.png?rlkey=q5d5oyzmrs8ytuiyzcbekm9v7&st=ev85otx2&dl=1",
      },
      {
        type: "INFJ",
        query: "INFJ",
        img_src:
          "https://www.dropbox.com/scl/fi/6wxifksbt0c936xlmo3d7/INFJ.png?rlkey=7l6o8yl266k4aor8kbru0b1hy&st=l6xxjeqc&dl=1",
      },
      {
        type: "INFP",
        query: "INFP",
        img_src:
          "https://www.dropbox.com/scl/fi/q4bpun6h0ddy1tf7a4h7c/INFP.png?rlkey=57mzaw4neohebbeh0xnrpcow9&st=m92y77uq&dl=1",
      },
    ],
  },
  // personalColorJP
  {
    info: {
      mainTitle: "パーソナルカラー診断_性格編",
      subTitle: "自分に似合う色は何だろう？ パーソナルカラーテスト",
      mainUrl: "personalColorJP",
      scoreType: "MBTI",
      mainImage:
        "https://www.dropbox.com/scl/fi/oyaueh1pzggp5s92532ba/personalColorJP-intro.png?rlkey=pc8j3xs4o64hlxoiqegk6nrdb&st=ipxjb532&dl=1",
      thumbImage:
        "https://www.dropbox.com/scl/fi/kt272mdx3kigrtgwojeod/personalColorJP-thumb.png?rlkey=j19yzp6gt6iokqgg8kzrl1gpj&st=gzznyj10&dl=1",
      lang: "JP",
      category: "characteristic",
    },
    questions: [
      {
        which: "EI",
        question: "처음 보는 친구들에게 나는?",
        answers: [
          {
            type: "E",
            content: "내가 먼저 말을 건낸다.",
          },
          {
            type: "I",
            content: "대부분 다른 친구가 먼저 말을 건낸다.",
          },
        ],
      },
      {
        which: "EI",
        question: "주말에 난?",
        answers: [
          {
            type: "E",
            content: "사람들과 만나는 것을 즐긴다.",
          },
          {
            type: "I",
            content: "혼자 있는 게 싫지 않은 편이다.",
          },
        ],
      },
      {
        which: "EI",
        question: "친구들과 놀 때 나는?",
        answers: [
          {
            type: "E",
            content: "왁자지껄한 신나는 분위기를 좋아한다.",
          },
          {
            type: "I",
            content: "소수의 친구들과 소소하게 대화하는 것을 좋아한다. ",
          },
        ],
      },
      {
        which: "SN",
        question: "내가 더 중요하게 생각하는 것은?",
        answers: [
          {
            type: "S",
            content: "현재가 없으면 미래도 없다.",
          },
          {
            type: "N",
            content: "미래를 생각하지 않으면 발전이 없다.",
          },
        ],
      },
      {
        which: "SN",
        question: "일할 때 나는?",
        answers: [
          {
            type: "S",
            content: "남들이 하는 대로 따라 가는 것이 좋다.",
          },
          {
            type: "N",
            content: "스스로 나만의 방법을 만드는 게 좋다. ",
          },
        ],
      },
      {
        which: "SN",
        question: "주변 사람들이 나에게 하는 말은?",
        answers: [
          {
            type: "S",
            content: "꾸준하고 참을성이 있다는 말을 자주한다.",
          },
          {
            type: "N",
            content: "창의적이고 독창적이라는 말을 자주한다.",
          },
        ],
      },
      {
        which: "TF",
        question: "거절해야 하는 상황이 오면 나는?",
        answers: [
          {
            type: "T",
            content: "강력하게 할 수 없다고 말한다.",
          },
          {
            type: "F",
            content: "고민하다가 대부분 들어주는 편이다.",
          },
        ],
      },
      {
        which: "TF",
        question: "화났을 때 나는?",
        answers: [
          {
            type: "T",
            content: "논리적으로 잘 말하면서 따진다. ",
          },
          {
            type: "F",
            content: "할말이 많지만 너무 분해서 눈물부터 난다.",
          },
        ],
      },
      {
        which: "TF",
        question:
          "고민을 얘기하는 친구, 듣다 보니 친구의 잘못인 것 같다. 그럴 때 나는?",
        answers: [
          {
            type: "T",
            content: "친구의 잘못된 점을 말해준다.",
          },
          {
            type: "F",
            content: "직접적으로 말하면 친구가 그래 할까봐 돌려 말한다.",
          },
        ],
      },
      {
        which: "JP",
        question: "준비물을 준비할 때 나는?",
        answers: [
          {
            type: "J",
            content: "하루 전 날 미리 준비한다.",
          },
          {
            type: "P",
            content: "‘내일 챙겨야지’ 하다가 까먹고 놓고 오는 일이 많다.",
          },
        ],
      },
      {
        which: "JP",
        question:
          "끝나고 집에 가서 공부하려 했는데, 친구들이 놀자고 붙잡는다. 나는?",
        answers: [
          {
            type: "J",
            content: "계획에 없던 일인데…매우 당황스럽다.",
          },
          {
            type: "P",
            content: "오케이! 역시 계획대로 안 되는 것이 인생! 놀자!!!!",
          },
        ],
      },
      {
        which: "JP",
        question: "내가 가고싶은 여행지 스타일은?",
        answers: [
          {
            type: "J",
            content:
              "내가 계획한대로! 계획적으로 일의 순서대로 진행하는 것을 좋아해!",
          },
          {
            type: "P",
            content:
              "그때그때 생각나는 대로 일 처리! 융통성 있게 하는 것을 좋아해!",
          },
        ],
      },
    ],
    results: [
      {
        type: "ESTJ",
        query: "ESTJ",
        img_src:
          "https://www.dropbox.com/scl/fi/pw32b9gizven8wqpw5dwf/ESTJ.png?rlkey=qtklzibgln378c3bdknwjw7tf&st=8l16g8ct&dl=1",
      },
      {
        type: "ESTP",
        query: "ESTP",
        img_src:
          "https://www.dropbox.com/scl/fi/ibgrksb70x2bjzcp0z04h/ESTP.png?rlkey=ik3lcdangfzm98erz6br44qb1&st=lhd9w11r&dl=1",
      },
      {
        type: "ESFJ",
        query: "ESFJ",
        img_src:
          "https://www.dropbox.com/scl/fi/3sj74dcaopwcef1nu21s5/ESFJ.png?rlkey=dsbzcq1d82u89qtzgvmke5ase&st=9cf15gjq&dl=1",
      },
      {
        type: "ESFP",
        query: "ESFP",
        img_src:
          "https://www.dropbox.com/scl/fi/fpewgwyldewu32atxl46r/ESFP.png?rlkey=wqk84mirvwsztbndmcxnyf5nq&st=6e0egn3c&dl=1",
      },
      {
        type: "ENTJ",
        query: "ENTJ",
        img_src:
          "https://www.dropbox.com/scl/fi/5z99j9pguw2v481c2684d/ENTJ.png?rlkey=gh85ty07z8wt487w67qxax5px&st=ss1r7dxx&dl=1",
      },
      {
        type: "ENTP",
        query: "ENTP",
        img_src:
          "https://www.dropbox.com/scl/fi/wbt2slrxassf1w1xkmtre/ENTP.png?rlkey=otdc1hazlyxnangfcryydh5k1&st=69k3sp7u&dl=1",
      },
      {
        type: "ENFJ",
        query: "ENFJ",
        img_src:
          "https://www.dropbox.com/scl/fi/45rtpzm7yc0abt0jpw4dg/ENFJ.png?rlkey=03bckb05d1vkz534jkqskdunh&st=sja06fnq&dl=1",
      },
      {
        type: "ENFP",
        query: "ENFP",
        img_src:
          "https://www.dropbox.com/scl/fi/q6mzyi55sr85bpaahvrbf/ENFP.png?rlkey=3721niechpy0xsvvc2i9rzrd3&st=96zbdbsu&dl=1",
      },
      {
        type: "ISTJ",
        query: "ISTJ",
        img_src:
          "https://www.dropbox.com/scl/fi/65z4aoimkhjya6wmu7vo8/ISTJ.png?rlkey=guf8653rlsy12qwqju2prox59&st=fgwc8cnp&dl=1",
      },
      {
        type: "ISTP",
        query: "ISTP",
        img_src:
          "https://www.dropbox.com/scl/fi/be1p8s7v4y3cn5l5jqm1q/ISTP.png?rlkey=3zylu48zhmqmit9ihfy76487u&st=8vdfflut&dl=1",
      },
      {
        type: "ISFJ",
        query: "ISFJ",
        img_src:
          "https://www.dropbox.com/scl/fi/kqlmkbn2pqvmf34ezybcd/ISFJ.png?rlkey=sd3dryf9pahqaq83t23g5hiq8&st=kxo5opty&dl=1",
      },
      {
        type: "ISFP",
        query: "ISFP",
        img_src:
          "https://www.dropbox.com/scl/fi/0p3eidtg3jcmfmxp6f59s/ISFP.png?rlkey=wmktoly5dyl6xezae7nwxwu3u&st=sh6o7h2i&dl=1",
      },
      {
        type: "INTJ",
        query: "INTJ",
        img_src:
          "https://www.dropbox.com/scl/fi/ibyezz790rxzciz7mmdmb/INTJ.png?rlkey=aewbj0ydimf4z1xv0olhpc2zh&st=lcotd17i&dl=1",
      },
      {
        type: "INTP",
        query: "INTP",
        img_src:
          "https://www.dropbox.com/scl/fi/gnthsbrbmpe23m07dacyt/INTP.png?rlkey=i45gddj68d5go2mpanknj4yf7&st=aois0s0l&dl=1",
      },
      {
        type: "INFJ",
        query: "INFJ",
        img_src:
          "https://www.dropbox.com/scl/fi/tndrtsb971747ngvvhh8a/INFJ.png?rlkey=y7lvzvphffjam2yr5hpsqhbnz&st=1sk1yal6&dl=1",
      },
      {
        type: "INFP",
        query: "INFP",
        img_src:
          "https://www.dropbox.com/scl/fi/8r17nrwcdlbop2nluv6c3/INFP.png?rlkey=6atqeqic5a98adqima7ii56qm&st=pf2ucdmw&dl=1",
      },
    ],
  },
];

// mbti.com
// images.mbti.com
