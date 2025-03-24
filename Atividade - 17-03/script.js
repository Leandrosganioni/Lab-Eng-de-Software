document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('counter-container');
    
    


    const counterDiv = document.createElement('div');
    counterDiv.style.fontFamily = 'Arial, sans-serif';
    counterDiv.style.maxWidth = '300px';
    counterDiv.style.margin = '0 auto';
    counterDiv.style.textAlign = 'center';
    counterDiv.style.padding = '20px';
    counterDiv.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    counterDiv.style.borderRadius = '10px';
    
    
    const totalTitle = document.createElement('h2');
    totalTitle.textContent = 'Total';
    totalTitle.style.marginBottom = '5px';
    totalTitle.style.color = '#333';
    
    
    const totalCount = document.createElement('div');
    totalCount.id = 'total-count';
    totalCount.textContent = '0';
    totalCount.style.fontSize = '36px';
    totalCount.style.fontWeight = 'bold';
    totalCount.style.marginBottom = '20px';
    totalCount.style.color = '#2c3e50';
    
    
    const genderCounters = document.createElement('div');
    genderCounters.style.display = 'flex';
    genderCounters.style.justifyContent = 'space-around';
    genderCounters.style.marginBottom = '20px';
    
    
    const warning = document.createElement('p');
    warning.textContent = 'Clique nas imagens praa adicionar um dos gêneros a conta';
    warning.style.fontSize = '12px';
    warning.style.color = '#666';
    warning.style.marginTop = '20px';
    warning.style.fontStyle = 'italic';

    function createGenderCounter(gender, imageSrc) {
        const genderDiv = document.createElement('div');
        
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = gender;
        img.style.width = '50px';
        img.style.height = '50px';
        img.style.cursor = 'pointer';
        
        
        const count = document.createElement('div');
        count.id = `${gender.toLowerCase()}-count`;
        count.textContent = '0';
        count.style.fontSize = '24px';
        count.style.margin = '10px 0';
        
        
        const controls = document.createElement('div');
        controls.style.display = 'flex';
        controls.style.justifyContent = 'center';
        controls.style.gap = '10px';
        
        
        const decreaseBtn = document.createElement('button');
        decreaseBtn.textContent = '-';
        decreaseBtn.style.fontSize = '16px';
        decreaseBtn.style.padding = '2px 10px';
        decreaseBtn.style.border = 'none';
        decreaseBtn.style.backgroundColor = '#e74c3c';
        decreaseBtn.style.color = 'white';
        decreaseBtn.style.borderRadius = '5px';
        decreaseBtn.style.cursor = 'pointer';
        
        
        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'Reset';
        resetBtn.style.fontSize = '12px';
        resetBtn.style.padding = '2px 10px';
        resetBtn.style.border = 'none';
        resetBtn.style.backgroundColor = '#7f8c8d';
        resetBtn.style.color = 'white';
        resetBtn.style.borderRadius = '5px';
        resetBtn.style.cursor = 'pointer';
        
        controls.appendChild(decreaseBtn);
        controls.appendChild(resetBtn);
        
        
        const label = document.createElement('div');
        label.textContent = gender;
        label.style.fontSize = '14px';
        label.style.color = '#555';
        
        genderDiv.appendChild(img);
        genderDiv.appendChild(count);
        genderDiv.appendChild(controls);
        genderDiv.appendChild(label);
        
        
        return { genderDiv, img, count, decreaseBtn, resetBtn };
    }
    
    
    const maleCounter = createGenderCounter('Homens', 'male.png');
    const femaleCounter = createGenderCounter('Mulheres', 'female.png');
    
    genderCounters.appendChild(maleCounter.genderDiv);
    genderCounters.appendChild(femaleCounter.genderDiv);
    
    
    const globalResetBtn = document.createElement('button');
    globalResetBtn.textContent = 'Reset Geral';
    globalResetBtn.style.fontSize = '16px';
    globalResetBtn.style.padding = '8px 20px';
    globalResetBtn.style.border = 'none';
    globalResetBtn.style.backgroundColor = '#e74c3c';
    globalResetBtn.style.color = 'white';
    globalResetBtn.style.borderRadius = '5px';
    globalResetBtn.style.cursor = 'pointer';
    globalResetBtn.style.marginTop = '20px';
    
    
    counterDiv.appendChild(totalTitle);
    counterDiv.appendChild(totalCount);
    counterDiv.appendChild(genderCounters);
    counterDiv.appendChild(globalResetBtn);
    counterDiv.appendChild(warning);
   
    container.appendChild(counterDiv);
    
    
    let count = 0;
    let maleCountValue = 0;
    let femaleCountValue = 0;
    
   
    function updateCounters() {
        totalCount.textContent = count;
        maleCounter.count.textContent = maleCountValue;
        femaleCounter.count.textContent = femaleCountValue;
    }
    
   
    maleCounter.img.addEventListener('click', function() {
        if (maleCountValue < 99) { 
            count++;
            maleCountValue++;
            updateCounters();
        }
    });
    
    maleCounter.decreaseBtn.addEventListener('click', function() {
        if (maleCountValue > 0) {
            count--;
            maleCountValue--;
            updateCounters();
        }
    });
    
    maleCounter.resetBtn.addEventListener('click', function() {
        count -= maleCountValue;
        maleCountValue = 0;
        updateCounters();
    });
    
   
    femaleCounter.img.addEventListener('click', function() {
        if (femaleCountValue < 99) { 
            count++;
            femaleCountValue++;
            updateCounters();
        }
    });
    
    femaleCounter.decreaseBtn.addEventListener('click', function() {
        if (femaleCountValue > 0) {
            count--;
            femaleCountValue--;
            updateCounters();
        }
    });
    
    femaleCounter.resetBtn.addEventListener('click', function() {
        count -= femaleCountValue;
        femaleCountValue = 0;
        updateCounters();
    });
    
  
    globalResetBtn.addEventListener('click', function() {
        count = 0;
        maleCountValue = 0;
        femaleCountValue = 0;
        updateCounters();
    });

    
});