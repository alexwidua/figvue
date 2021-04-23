figma.showUI(__html__, {
	width: 298,
	height: 229
})

figma.ui.onmessage = (data) => {
	if (data.type === 'create') {
		const nodes: SceneNode[] = []
		for (let i = 0; i < data.count; i++) {
			const rect = figma.createRectangle()
			rect.x = i * 150
			rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.41, b: 0.7 } }]
			figma.currentPage.appendChild(rect)
			nodes.push(rect)
		}
		figma.currentPage.selection = nodes
		figma.viewport.scrollAndZoomIntoView(nodes)
	}

	if (data.type === 'cancel') {
		figma.closePlugin()
	}
}
