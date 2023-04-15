// Function to adjust the container element's class based on whether the views are displayed
function expand(): void {
    if (view) {
        // If either the protocol or diagram views are displayed, add the "expanded" class to the container element
        if (showDiagram || showProtocol) {
            view.classList.add ("expanded");
        } else { // Otherwise, remove the "expanded" class from the container element
            view.classList.remove ("expanded");
        }
    }
}

// Define boolean variables to track whether the protocol and diagram views are currently displayed
let showProtocol = false;
let showDiagram = false;

// Get a reference to the container element for the views
const view: HTMLElement | null = document.getElementById("views");

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
