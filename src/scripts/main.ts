/* ==========================================================================
Resizeable bottom-bar


   ========================================================================== */
// Last size of the expanded view
let lastSize = "300px";

// Booleans whether the protocol and diagram views are currently displayed
let showProtocol = false;
let showDiagram = false;

// Store the starting Y coordinate of the mouse and height of the div
let startY: number;
let startHeight: number;

// References
const views = document.getElementById("views") as HTMLElement;

const protocolView: HTMLElement | null = document.getElementById("protcol-view");
const protocolViewButton: HTMLElement | null = document.getElementById("protocol-view-button");

const diagramView: HTMLElement | null = document.getElementById("diagram-view");
const diagramViewButton: HTMLElement | null = document.getElementById("diagram-view-button");

const tabBar = document.querySelector("#view-tabs") as HTMLDivElement;

// Adjusts the container element's class and height based on whether the views are displayed
function expand(): void {
	if (views) {
		// If either the protocol or diagram views are displayed, add the "expanded" class and height to the container element
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

// Function to resize the div based on the difference between the starting Y coordinate and the current Y coordinate
function resizeDiv(e: MouseEvent): void {
	// Calculate the new height of the div
	const newHeight = startHeight - (e.clientY - startY);

	//Set the new height of the div if it is at least 100 pixels
	if (newHeight >= 100) {
		views.style.height = newHeight + "px";
	}
}

// Function to remove the mousemove and mouseup event listeners when the user releases the mouse button
function stopResize(): void {
	document.documentElement.removeEventListener("mousemove", resizeDiv);
	document.documentElement.removeEventListener("mouseup", stopResize);
}

// Add a click event listener to the protocol view button
protocolViewButton?.addEventListener("click", () => {
	// Toggle the "hidden" attribute of the protocol view element
	if (protocolView) {
		protocolView.toggleAttribute ("hidden");
		// Update the showProtocol variable to reflect the current state
		showProtocol = !showProtocol;

		expand();
	}
});

// Add a click event listener to the diagram view button
diagramViewButton?.addEventListener("click", () => {
	// Toggle the "hidden" attribute of the diagram view element
	if (diagramView) {
		diagramView.toggleAttribute ("hidden");
		// Update the showDiagram variable to reflect the current state
		showDiagram = !showDiagram;

		expand();
	}
});

// Mousedown event listener to the tab-bar to resize the views div
tabBar.addEventListener("mousedown", (e: MouseEvent) => {
	// Check if the target element is the div itself and only resize if the view is expanded
	if (e.target === tabBar && views.classList.contains("expanded")) {
		// Store the starting Y coordinate and height of the div
		startY = e.clientY;
		startHeight = parseInt(window.getComputedStyle(views).height, 10);

		// Add mousemove and mouseup event listeners to the document element
		document.documentElement.addEventListener("mousemove", resizeDiv);
		document.documentElement.addEventListener("mouseup", stopResize);
	}
});