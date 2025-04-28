// https://www.google.com/search?q=pacman&sca_esv=cb1f89ff82570eae&sxsrf=ADLYWILAAFpFPyigfd3OEhOneMVV4k_DPw%3A1717835962246&ei=uhhkZp-6DtzP2roPqIz2yAQ&udm=&ved=0ahUKEwif_77SzcuGAxXcp1YBHSiGHUkQ4dUDCA8&uact=5&oq=pacman&gs_lp=Egxnd3Mtd2l6LXNlcnAiBnBhY21hbjIKECMYgAQYJxiKBTIOEC4YgAQYsQMYgwEY1AIyDhAuGIAEGLEDGIMBGNQCMggQABiABBjLATIIEAAYgAQYywEyCBAAGIAEGMsBMggQABiABBjLATIIEAAYgAQYywEyChAAGIAEGBQYhwIyBRAAGIAESKMLUPQJWPQJcAF4AZABAJgBgwGgAYMBqgEDMC4xuAEDyAEA-AEBmAICoAKOAcICChAAGLADGNYEGEeYAwCIBgGQBgqSBwMxLjGgB8YK&sclient=gws-wiz-serp

const container = document.querySelector('.container');
console.log(container);

// const wall = [[3, 4], [7, 8], [10, 11], [12, 13], [17, 16]];
// const wall = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const wall = [];

for (let i = 0; i < 10; i++) {
    const span = document.createElement('span');
    const div = document.createElement('div');

    for (let j = 0; j < 20; j++) {
        const pix = document.createElement('div');
        pix.classList.add('pix');
        // if () {
            
        // }
        // if (j === wall[i]) {
        //     console.log('---');
        //     pix.style.border = "1px solid #ccc";
        // }
        div.prepend(pix);
    }
    span.append(div);
    container.append(span);
}


for (let i = 0; i < ; i++) {
    const element =  
}

