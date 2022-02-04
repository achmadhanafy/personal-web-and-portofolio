
const projects= []
const month = [
    'January',
    'February',
    'March',
    'April',
    'Mei',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'Desember'
  ]

function getProject(event){
    event.preventDefault()
    $('#hide').click(function(){
        $('.hidden').hide();
        let projectDetail = document.getElementById('projectDetail')
        projectDetail.innerHTML = `Sudah jalan`
    });
}

function postData(event){
    event.preventDefault()

    let projectName = document.getElementById('projectName').value
    let startDate = document.getElementById('startDate').value
    let endDate = document.getElementById('endDate').value
    let description = document.getElementById('description').value
    startDate = new Date(startDate)
    endDate = new Date(endDate)

    const dateStart = startDate.getDate();
    const monthStart = month[startDate.getMonth()] 
    const yearStart = startDate.getFullYear()

    startDate = `${dateStart} ${monthStart} ${yearStart}`

    const dateEnd = endDate.getDate();
    const monthEnd = month[endDate.getMonth()] 
    const yearEnd = endDate.getFullYear()

    endDate = `${dateEnd} ${monthEnd} ${yearEnd}`


    const techno = []
    for(let i =1;i < 7; i++){
        if (document.getElementById(`techno${i}`).checked == true){
            techno.push(document.getElementById(`techno${i}`).value)
        }
    }

    let uploadImage = document.getElementById('chooseFile')

    uploadImage = URL.createObjectURL(uploadImage.files[0])

    const setup = () => {
        let firstDate = $('#startDate').val();
        let secondDate = $('#endDate').val();
        const findTheDifferenceBetweenTwoDates = (firstDate, secondDate) => {
        firstDate = new Date(firstDate);
          secondDate = new Date(secondDate);
          
          let timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());
          
          let millisecondsInADay = (1000 * 3600 * 24);
          
          let differenceOfDays = Math.ceil(timeDifference / millisecondsInADay);

          let differenceofMonth = Math.floor(differenceOfDays/ 30 )

          let modOfDifferenceMonth = differenceOfDays % 30

          if (differenceofMonth >= 1){
              return differenceofMonth + " Month " + modOfDifferenceMonth +" Day "
          } else {
              return differenceOfDays+" Days"
          }
          
          
        }

        let result = findTheDifferenceBetweenTwoDates(firstDate, secondDate)
        return result
    }

    let differenceDate = setup()
    let postProject = {
        projectName,
        startDate,
        endDate,
        differenceDate,
        description,
        techno,
        uploadImage
    }

    console.log(postProject);
    projects.push(postProject)
    for(let i = 0; i<projects.length;i++){
        if (i+1 == projects.length){
            localStorage.setItem(`projectsList${i}`,JSON.stringify(projects[i]))
            //JSON.parse(localStorage.getItem('projectsList0'))
        }

    }
    
    
    renderProject()
    document.getElementById("formProject").reset(); 
}


function getTechno(index){
    let technoList2 = [];

    for(let j=0;j<projects[index].techno.length;j++){
        technoList2.push(`<img src="${projects[index].techno[j]}" width="80px"/>`)
        console.log(technoList2);
    }
    return technoList2

}

function truncateText(selector, maxLength) {
    var element = document.getElementById(selector),
        truncated = element.innerText;

    if (truncated.length > maxLength) {
        truncated = truncated.substr(0,maxLength) + '...';
    }
    return truncated;
}

function editProject(param){

}

function deleteProject(param){
    let deleteProject2 = document.getElementById('projectList'+param)
    deleteProject2.remove()
    delete projects[param]
}

function renderProject(){
    
    let projectContainer = document.getElementById('projects')

    projectContainer.innerHTML = firstBlogContent()
    for(let i=0; i < projects.length;i++){
            projectContainer.innerHTML += `
            <div class="projectList" id="projectList${i}">
                        <a href=project-detail.html?projectsList${i} target="_blank" style="cursor: pointer; text-decoration: none;" id="projectDetailLink" href="project-detail.html">
                        <img src="${projects[i].uploadImage}" width="100%" height="40%" alt="">
                        </a>
                        <div style="height: 30%; margin: auto;">
                            <p style="font-weight: bold; font-size: large; margin: 0px;">${projects[i].projectName}</p>
                            <p style="color: #564f4f ; margin: 0px;">Durasi: ${projects[i].differenceDate}</p>
                            <p id="des${i}" style="margin-top: 20px;">${projects[i].description}</p>
                        </div>
                        <div class="technoList" id="technoList" style="display: grid; height: 20%; font-weight: bold;grid-template-columns: repeat(6, minmax(0, 1fr)); width: 100%;">
                            ${getTechno(i)}
                        </div>

                        <div>
                            
                        </div>
                        <div class="buttonList">
                                <button id="projectEdit" style="curson: pointer;" onclick="editProject(${i})">
                                edit
                                </button>
                            
                               <button id="projectDelete" style="cursor: pointer;" onclick="deleteProject(${i})">
                                delete
                               </button>
                        </div>
                    </div>
            `
            
            document.getElementById(`des${i}`).innerText = truncateText(`des${i}`, 150);
        }
        
        
}


function firstBlogContent(){
    return `
    <div class="projectList" id="projectList">
    <a href="project-detail.html" style="cursor: pointer; text-decoration: none;" id="projectDetailLink" href="project-detail.html">
        <img src=" https://drive.google.com/uc?id=1KBbIoBkdbFOz25avQVvpsF224hUOocs3" width="100%" height="40%" alt="">
      </a>  
        <div style="height: 40%; margin: auto;">
             <p style="font-weight: bold; font-size: large; margin: 0px;">Personal Web Page</p>
            <p style="color: #564f4f ; margin: 0px;">Durasi : 1 bulan</p>
            <p style="margin-top: 20px;">Personal website to introducing my self and my background. This web user can contact me to get touch with me using email in the contact form. And this website have post my project i have been create</p>
        </div>
        <div class="technoList" id="technoList" style="display: flex; height: 10%; font-weight: bold;">
            <p>HTML</p>
            <p>CSS</p>
            <p>Javascript</p>
        </div>

        <div>
                            
        </div>
        <div class="buttonList">
        <button id="projectEdit" style="curson: pointer;">
            edit
        </button>
        <button id="projectEdit" style="curson: pointer;">
            delete
        </div>
        </button>
        </div>
    `
}



