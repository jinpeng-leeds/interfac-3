// Before/After Slider Functionality
function initBeforeAfterSlider(sliderId, inputId) {
    const slider = document.getElementById(sliderId);
    const input = document.getElementById(inputId);
    const wrapper = slider.closest('.before-after-wrapper');
    const afterImage = wrapper.querySelector('.after-image');
    let isDragging = false;
    let currentValue = 50;

    // Update slider position and clip-path based on value (0-100)
    function updateSlider(value) {
        // Clamp value between 0 and 100
        value = Math.max(0, Math.min(100, value));
        currentValue = value;

        // Update slider handle position (0% = left, 100% = right)
        slider.style.left = value + '%';

        // Update clip-path for after image
        // 0% = show all before image (clip all of after)
        // 100% = show all after image (clip none of after)
        afterImage.style.clipPath = `inset(0 ${100 - value}% 0 0)`;

        // Update range input value
        input.value = value;
    }

    // Get position from mouse/touch event
    function getPosition(e) {
        const rect = wrapper.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const percentage = (x / rect.width) * 100;
        return percentage;
    }

    // Handle mouse down / touch start
    function startDrag(e) {
        isDragging = true;
        updateSlider(getPosition(e));
        e.preventDefault();
    }

    // Handle mouse move / touch move
    function onDrag(e) {
        if (isDragging) {
            updateSlider(getPosition(e));
            e.preventDefault();
        }
    }

    // Handle mouse up / touch end
    function stopDrag() {
        isDragging = false;
    }

    // Mouse events
    wrapper.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);

    // Touch events
    wrapper.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', onDrag, { passive: false });
    document.addEventListener('touchend', stopDrag);

    // Range input change
    input.addEventListener('input', function() {
        if (!isDragging) {
            updateSlider(parseFloat(this.value));
        }
    });

    // Mouse move over wrapper (hover effect)
    wrapper.addEventListener('mousemove', function(e) {
        if (!isDragging) {
            const percentage = getPosition(e);
            // Smoothly follow mouse when hovering
            updateSlider(percentage);
        }
    });

    // Initialize at center (50%)
    updateSlider(50);
}

// Initialize both sliders when page loads
document.addEventListener('DOMContentLoaded', function() {
    // First slider: 3.jpg (after) and 4.jpg (before)
    initBeforeAfterSlider('slider1', 'slider-input1');

    // Second slider: 7.jpg (after) and 8.jpg (before)
    initBeforeAfterSlider('slider2', 'slider-input2');
});

