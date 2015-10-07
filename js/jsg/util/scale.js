var Scale = {

    getReal: function(virtualSizeOfObject) {
        return virtualSizeOfObject * CANVAS.getWidth() / CANVAS.getVirtualWidth();
    },

    getVirtual: function(virtualSizeOfObject) {
        return virtualSizeOfObject * CANVAS.getVirtualWidth() / CANVAS.getWidth();
    }
};
