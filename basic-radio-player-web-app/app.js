const radioStreams = [
    {
        channelName: "90'lar",
        src: 'http://37.247.98.8/stream/166/'
    },
    {
        channelName: "Best Fm",
        src: 'http://46.20.7.125/listen.pls'
    },
    {
        channelName: "Power Fm",
        src: 'http://powerfm.listenpowerapp.com/powerfm/mpeg/icecast.audio'
    },
    {
        channelName: "Radyo Fenomen",
        src: 'http://fenomen.listenfenomen.com/fenomen/128/icecast.audio'
    }
];

const selectList = document.getElementsByTagName('select')[0];
const playBtn = document.querySelector('#playBtn');
const audioElem = document.getElementsByTagName('audio')[0];
const nextBtn = document.querySelector('#nextBtn');
const prevBtn = document.querySelector('#prevBtn');
const channelShow = document.querySelector('#channelShow');
const setTime = document.querySelector('#setTime');
const range = document.getElementsByTagName('input')[0];

let control = true;
let nPindex = -1;
let mutedControl = true;

main = (data,callback) => {
    data.forEach((element,index) => {
        selectList.innerHTML += `<option data-id="${index}" value="${element.src}">${element.channelName}</option>`
    });
    callback(); // PLAY Func.
}

play = () => {
    audioElem.volume = parseInt(range.value) / 100; 
    selectList.addEventListener('change', (e) => {
        for (let i = 1; i < e.target.length; i++) {
            if (e.target[i].value == e.target.value) {
                nPindex = parseInt(e.target[i].getAttribute('data-id'));
            }
        }
        selectList.children[0].innerText = 'Select Channel';
        audioElem.src = '';
        if (e.target.value == 'selectCh') {
            playBtn.setAttribute('disabled','true')
            audioElem.src = ''
        }else{
            playBtn.removeAttribute('disabled');
            control = true;
            audioElem.src = e.target.value;
            playBtn.innerHTML = `<i class="fas fa-pause"> </i>`;
            audioElem.play();
            channelShow.innerHTML = `${radioStreams[nPindex].channelName}`
        }
    });
    playBtn.setAttribute('disabled','true')
    playBtn.addEventListener('click', () => {
        if (control) {
            playBtn.innerHTML = `<i class="fas fa-play"> </i>`;
            control = false;
            audioElem.pause();
        }else{
            playBtn.innerHTML = `<i class="fas fa-pause"> </i>`;
            control = true;
            audioElem.play();
        }
    });
    next();
    previous();
    soundVal();
    setTimeClose();
}

next = () => {
    nextBtn.addEventListener('click', () => {
        if (radioStreams.length > nPindex) {
            if (nPindex == radioStreams.length - 1) {
                nPindex = -1;
            }
            nPindex++;
            audioElem.src = radioStreams[nPindex].src;
            playBtn.removeAttribute('disabled');
            playBtn.innerHTML = `<i class="fas fa-pause"> </i>`;
            channelShow.innerHTML = `${radioStreams[nPindex].channelName}`
            audioElem.play();
        }
    })
}

previous = () => {
    prevBtn.addEventListener('click', () => {
        if (radioStreams.length > nPindex) {
            if (nPindex == -1) {
                nPindex = radioStreams.length;
            }
            nPindex--;
            audioElem.src = radioStreams[nPindex].src;
            playBtn.removeAttribute('disabled');
            playBtn.innerHTML = `<i class="fas fa-pause"> </i>`;
            channelShow.innerHTML = `${radioStreams[nPindex].channelName}`
            audioElem.play();
        }
    })
}

setTimeClose = () => {
    setTime.addEventListener('click', () => {
        let minVal = prompt('Minute Value... Max 60Min.');
        if (minVal > 60) {
            return false;
        }else{
            setTimeout(() => {
                document.location.reload();
            }, minVal*100000 - (40000 * minVal));
        }
        
    })
}

muted = () => {
    if (mutedControl) {
        audioElem.muted = true 
        mutedControl = false;
    }else{
        audioElem.muted = false
        mutedControl = true
    }
}

soundVal = () => {
    range.addEventListener('input', (e) => {
        audioElem.volume = parseInt(e.target.value) / 100;
    })
}

main(radioStreams,play);
