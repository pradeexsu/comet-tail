let block = document.querySelector(".block-1"),
    slider = document.querySelector(".slider");

// on mouse down (drag start)
slider.onmousedown = function dragMouseDown(e) {
    // get position of mouse
    let dragX = e.clientX;
    // register a mouse move listener if mouse is down
    document.onmousemove = function onMouseMove(e) {
        // e.clientY will be the position of the mouse as it has moved a bit now
        // offsetHeight is the height of the block-1
        block.style.width = block.offsetWidth + e.clientX - dragX + "px";
        // update variable - till this pos, mouse movement has been handled
        dragX = e.clientX;
    }
    // remove mouse-move listener on mouse-up (drag is finished now)
    document.onmouseup = () => document.onmousemove = document.onmouseup = null;
}