document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('command-input');
    const output = document.getElementById('output');
    const loadingContainer = document.getElementById('loading-container');
    const loadingBar = document.getElementById('loading-bar');
    const loadingPercentage = document.getElementById('loading-percentage');
    const terminal = document.querySelector('.terminal');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const closeButton = document.querySelector('.close-button');

    // Load the sound file
    const sound = new Audio('sound/aeiou.mp3'); // Adjust the path to your sound file as needed
    const boot = new Audio('sound/apple (mp3cut.net).mp3');

    // ASCII art for "Welcome" and available commands
    const welcomeMessage = `
  _      __    __                  
 | | /| / /__ / /______  __ _  ___ 
 | |/ |/ / -/) / __/ _ \\/  ' \\/ -_)
 |__/|__/\\__/_/\\__/_\\___/_/_/_/\\__/ 

About 

Ryan Nikopour is a Digital Media Art BFA major studying at
San Jose State University, with a minor in Computer Science.
He yearns to conjoin elements of artistic expression with
technical ingenuity to create eloquent video game experiences. He has
been featured in a publication, such as BarBar Magazine, and has
showcased his art at Makerfaire 2024. 

Enter one of the following commands to navigate the website:

- blender                       : View Blender art projects
- digital                       : View glitch art, graphic design, & digital illustrations
- videos                        : View videos
- aeiou                         : Play a funny sound
- clear                         : Clear console 
`;

    // Sample image data for commands
    const imageData = {
        "blender": [
            { src: "images/Earth.png", thumbnail: "", description: "(Earth) - Created using Blender v3.5" },
            { src: "images/room.jpg", thumbnail: "", description: "(The Room) - Created using Blender v3.5" },
            { src: "images/HeeseungAngle2.png", thumbnail: "", description: "(Heesung) - Created using Blender v3.5" },
            { src: "images/StarTrails.png", thumbnail: "", description: "(Star Gazing) - Created using Blender v3.5 and Adobe Photoshop" },
            { src: "images/ReinaldMoonCheesepng.png", thumbnail: "", description: "(Moon Cheese) - Created using Blender v4.2" },
            { src: "images/RenaldRat(V2.0).png", thumbnail: "", description: "(Renald the Rat) - Created using Blender v4.2" },
        ],
        "digital": [
            { src: "images/forgot.jpg", description: "(Forgotten Past) - Created using Processing 3" },
            { src: "images/rooted.png", description: "(Rooted to You) - Created using Adobe Illustrator & Photoshop" },
            { src: "images/cover.png", description: "(Tunezilla Cover) - Created using Adobe Illustrator & Substance 3D" },
            { src: "images/proposal.png", description: "(Opposite Attraction) - Created using Adobe Illustrator & Photoshop" },
            { src: "images/alter.jpg", description: "(Alterlight) - Created using Processing 3" },
            { src: "images/gun.jpg", description: "(Espionage) - Created using Adobe Illustrator" },
            { src: "images/movie.jpg", description: "(Rules of the Game Movie Poster) - Created using Adobe Illustrator" },
            { src: "images/frag.jpg", description: "(Fragmented Depression) - Created using Adobe Illustrator, Processing 3" },
            { src: "images/meta.jpg", description: "(Inhuman) - Created using Unreal Engine 5, Processing 3" },
            { src: "images/earthman.jpg", description: "(Earth Man) - Created using Adobe Illustrator" },
            { src: "images/drink.jpg", description: "(Drink Away) - Created using Adobe Illustrator" },
            { src: "images/roboticinvasion.jpg", description: "(Lies) - Created using Adobe Illustrator" },
            { src: "images/shirt.jpg", description: "(Perseverance) - Created using Adobe Illustrator" },
            { src: "images/hyp.jpg", description: "(Hypoxic) - Created using Adobe Illustrator, Processing 3" },
            { src: "images/svic.png", description: "(SVIC Info Session) - Created using Adobe Illustrator"},
            { src: "images/Web Design (Vaporwave).png", description: "(SiliconXHacks Homepage prototype) - Created using Adobe Illustrator & Photoshop"},
            { src: "images/ZinnStarterFlyer.png", description: "(Zinnstarter Flyer) - Created using Adobe Illustrator & Photoshop"},

        ],
        "videos": [
            { src: "videos/project_04.mp4", thumbnail: "images/project_04_thumbnail.gif", description: "(Simple Street) - Created using Adobe Animate, Adobe Stock" },
            { src: "videos/project_05.mp4", thumbnail: "images/project_05_thumbnail.gif", description: "(12 Months) - Created using Adobe Premiere Pro, Adobe Stock" },
            { src: "videos/project_06.mp4", thumbnail: "images/project_06_thumbnail.gif", description: "(Sound Design) - Created using Adobe Premiere Pro, Adobe Stock, Freesound" },
            { src: "videos/VapoCar.mp4", thumbnail: "images/VapoCar.gif", description: "(Vapo Car) - Created using Adobe Premiere Pro, Blender v3.5" },
            { src: "videos/osci.mp4", thumbnail: "images/osci_thumbnailgif.gif", description: "(Osci) - Created using Adobe Premiere Pro, Adobe After Effects, Processing 3" },
        ],
        "clear": [], // No images for home, just return to the main page
    };

    // Pagination variables
    const imagesPerPage = 6;
    let currentPage = 0;
    let currentCommand = '';

    // Hide terminal and modal initially
    terminal.style.display = 'none';
    modal.style.display = 'none';

    // Create loading interval
    let loadProgress = 0;
    const loadInterval = setInterval(() => {
        loadProgress += 10;
        loadingBar.style.width = loadProgress + '%';
        loadingPercentage.textContent = loadProgress + '%';

        if (loadProgress >= 100) {
            clearInterval(loadInterval);
            loadingContainer.style.display = 'none'; // Hide loading container
            terminal.style.display = 'block'; // Show the terminal
            input.focus(); // Focus on the input box
            output.innerHTML += `<pre>${welcomeMessage}</pre>`; // Show welcome message
            boot.play(); // Play boot-up sound
            
        }
    }, 300); // Increment progress every 300 ms

    // Command input handling
    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const command = input.value.toLowerCase().trim();
            input.value = ''; // Clear the input

            // Output previous command and response
            const commandOutput = document.createElement('pre');
            commandOutput.textContent = `> ${command}`;
            output.appendChild(commandOutput);

            // Check if the command is "aeiou" and play the sound
            if (command === 'aeiou') {
                sound.play().catch((error) => {
                    console.error('Error playing sound:', error);
                });
                // output.innerHTML = `<pre>${welcomeMessage}</pre>`;
            }

            // Process the command
            else if (command in imageData) {
                if (command === 'clear') {
                    output.innerHTML = `<pre>${welcomeMessage}</pre>`;
                    resetPagination();
                } else {
                    currentCommand = command;
                    currentPage = 0;
                    displayImages(imageData[command]);
                }
            } else {
                output.innerHTML += `<pre>Unknown command: ${command}</pre>`;
            }

            // Scroll to the bottom of the output
            output.scrollTop = output.scrollHeight;
        }
    });

    // Function to reset pagination
    function resetPagination() {
        currentPage = 0;
        currentCommand = '';
    }

    // Function to display images in rows of three with pagination
    function displayImages(images) {
        // Clear previous images and pagination controls
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        output.appendChild(imageContainer); // Create a new container for the images
    
        // Clear any previous image containers
        const existingContainers = output.getElementsByClassName('image-container');
        if (existingContainers.length > 1) {
            for (let i = 0; i < existingContainers.length - 1; i++) {
                existingContainers[i].remove(); // Remove previous image containers
            }
        }
    
        // Clear existing pagination controls if any
        const existingPagination = output.querySelector('.pagination-controls');
        if (existingPagination) {
            existingPagination.remove();
        }
    
        const totalPages = Math.ceil(images.length / imagesPerPage);
        const startIndex = currentPage * imagesPerPage;
        const endIndex = startIndex + imagesPerPage;
    
        // Display images or thumbnails for the current page
        images.slice(startIndex, endIndex).forEach((item) => {
            const element = document.createElement('img');
            element.src = item.thumbnail || item.src; // Use thumbnail for videos, or the src for images
            element.alt = 'Art piece';
            // Set dimensions based on command type
            if (currentCommand === 'blender projects' || currentCommand === 'digital illustrations') {
                element.style.width = '150px'; // Smaller size for Blender and illustrations
                element.style.height = '150px';
            } else {
                element.style.width = '150px';  // Larger size for videos
                element.style.height = '150px';
            }
            element.style.objectFit = 'cover'; // Preserve aspect ratio
            element.onclick = () => openModal(item.src, item.description); // Open modal on click
            imageContainer.appendChild(element);
        });
        
        // Create pagination controls
        if (totalPages > 1) {
            const paginationDiv = document.createElement('div');
            paginationDiv.className = 'pagination-controls';
            if (currentPage > 0) {
                const prevButton = document.createElement('button');
                prevButton.textContent = 'Previous';
                prevButton.onclick = () => changePage(-1, images);
                paginationDiv.appendChild(prevButton);
            }
            if (currentPage < totalPages - 1) {
                const nextButton = document.createElement('button');
                nextButton.textContent = 'Next';
                nextButton.onclick = () => changePage(1, images);
                paginationDiv.appendChild(nextButton);
            }
            output.appendChild(paginationDiv); // Append pagination controls
        }

        // Scroll to the bottom of the output
        output.scrollTop = output.scrollHeight;
    }

    // Function to change the page
    function changePage(direction, images) {
        currentPage += direction; // Increment or decrement the page number
        displayImages(images); // Redisplay the images for the new page
    }

    // Function to open modal with the video/image and description
    function openModal(mediaSrc, description) {
        const isVideo = mediaSrc.endsWith('.mp4'); // Determine if the media is a video
        modal.style.display = 'flex';
        
        if (isVideo) {
            const videoElement = document.createElement('video');
            videoElement.src = mediaSrc;
            videoElement.controls = true; // Add controls for the video
            videoElement.style.width = '80vw'; // Set a responsive width for the video
            videoElement.style.height = 'auto'; // Allow height to auto-adjust
            modalDescription.textContent = description;

            // Clear existing content in the modal and append video
            modal.innerHTML = ''; // Clear the modal content
            modal.appendChild(videoElement);
            modal.appendChild(modalDescription);
            videoElement.play(); // Automatically play the video
        } else {
            modalImage.src = mediaSrc;
            modalImage.style.display = 'block'; // Show image element for images
            modalImage.style.width = '80vw'; // Set a responsive width for image in modal
            modalImage.style.height = 'auto'; // Allow height to auto-adjust
            modalDescription.textContent = description;

            // Clear existing content in the modal and append image and description
            modal.innerHTML = ''; // Clear the modal content
            modal.appendChild(modalImage);
            modal.appendChild(modalDescription);
        }
    }

    // Close modal when clicking outside the modal content
    closeButton.onclick = () => {
        modal.style.display = 'none';
        // Remove video element when closing the modal
        const videoElement = modal.querySelector('video');
        if (videoElement) {
            videoElement.pause(); // Pause the video
            videoElement.remove(); // Remove video element from the DOM
        }
    };
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            // Remove video element when closing the modal
            const videoElement = modal.querySelector('video');
            if (videoElement) {
                videoElement.pause(); // Pause the video
                videoElement.remove(); // Remove video element from the DOM
            }
        }
    };
});
