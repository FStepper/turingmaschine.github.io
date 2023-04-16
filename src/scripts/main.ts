let lastSize = "300px";

// Function to adjust the container element's class based on whether the views are displayed
function expand(): void {
	if (views) {
		// If either the protocol or diagram views are displayed, add the "expanded" class to the container element
		if (showDiagram || showProtocol) {
			views.classList.add ("expanded");
			views.style.height = lastSize;

		} else { // Otherwise, remove the "expanded" class from the container element
			lastSize = views.style.height;
			views.classList.remove ("expanded");
			views.style.height = "30px";
		}
	}
}

// Define boolean variables to track whether the protocol and diagram views are currently displayed
let showProtocol = false;
let showDiagram = false;

// Get a reference to the container element for the views
const views = document.getElementById("views") as HTMLElement;

// Get references to the protocol view element and its associated button
const protocolView: HTMLElement | null = document.getElementById("protcol-view");
const protocolViewButton: HTMLElement | null = document.getElementById("protocol-view-button");

// Add a click event listener to the protocol view button
protocolViewButton?.addEventListener("click", () => {
	// Toggle the "hidden" attribute of the protocol view element
	if (protocolView) {
		protocolView.toggleAttribute ("hidden");
		// Update the showProtocol variable to reflect the current state
		showProtocol = !showProtocol;
		// Call the expand() function to adjust the container element's class based on whether the views are displayed
		expand();
	}
});

// Get references to the diagram view element and its associated button
const diagramView: HTMLElement | null = document.getElementById("diagram-view");
const diagramViewButton: HTMLElement | null = document.getElementById("diagram-view-button");

// Add a click event listener to the diagram view button
diagramViewButton?.addEventListener("click", () => {
	// Toggle the "hidden" attribute of the diagram view element
	if (diagramView) {
		diagramView.toggleAttribute ("hidden");
		// Update the showDiagram variable to reflect the current state
		showDiagram = !showDiagram;
		// Call the expand() function to adjust the container element's class based on whether the views are displayed
		expand();
	}
});


/* ==========================================================================
Resizeable bottom-bar


   ========================================================================== */

// Get a reference to the resizable div
const tabBar = document.querySelector<HTMLDivElement>("#view-tabs")!;
const viewsExpanded = document.getElementById("views.expanded") as HTMLElement;

// Declare variables to store the starting Y coordinate and height of the div
let startY: number;
let startHeight: number;

// Add a mousedown event listener to the div
tabBar.addEventListener("mousedown", (e: MouseEvent) => {
	// Check if the target element is the div itself
	if (e.target === tabBar && views.classList.contains("expanded")) {
		// Store the starting Y coordinate and height of the div
		startY = e.clientY;
		startHeight = parseInt(window.getComputedStyle(views!).height, 10);

		// Add mousemove and mouseup event listeners to the document element
		document.documentElement.addEventListener("mousemove", resizeDiv);
		document.documentElement.addEventListener("mouseup", stopResize);

		// Set the cursor style to "n-resize" to indicate that the div is resizable from its top edge
		//tabBar.style.cursor = "n-resize";
	}
});

// Define the resizeDiv function to resize the div based on the difference between the starting Y coordinate and the current Y coordinate
function resizeDiv(e: MouseEvent): void {
	// Calculate the new height of the div
	const newHeight = startHeight - (e.clientY - startY);

	//Set the new height of the div if it is at least 50 pixels
	if (newHeight >= 50) {
		views.style.height = newHeight + "px";
	}
}

// Define the stopResize function to remove the mousemove and mouseup event listeners when the user releases the mouse button
function stopResize(): void {
	document.documentElement.removeEventListener("mousemove", resizeDiv);
	document.documentElement.removeEventListener("mouseup", stopResize);

	// Set the cursor style back to its default value
	//tabBar.style.cursor = "auto";
}
