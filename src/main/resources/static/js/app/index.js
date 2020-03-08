const index = {
    init() {
        const that = this;
        document.getElementById('btn-save') && document.getElementById('btn-save').addEventListener('click', () => {
            that.save();
        });
        document.getElementById('btn-update') && document.getElementById('btn-update').addEventListener('click', () => {
            that.update();
        });
        document.getElementById('btn-delete') && document.getElementById('btn-delete').addEventListener('click', () => {
            that.delete();
        });
    },
    save() {
        const data = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            content: document.getElementById('content').value,
        };

        fetch('/api/v1/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => res.json())
            .then((data) => {
                alert('글이 등록되었습니다.');
                window.location.href = '/';
            }).catch((err) => alert(err));
    },
    update() {
        const data = {
            title: document.getElementById('title').value,
            content: document.getElementById('content').value,
        };

        const id = document.getElementById('id').value;

        fetch(`/api/v1/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {
            alert('글이 수정되었습니다.');
            window.location.href = '/';
        })
            .catch((err) => alert(err));
    },
    delete() {
        const id = document.getElementById('id').value;

        fetch(`/api/v1/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(() => {
            alert('글이 삭제되었습니다.');
            window.location.href = '/';
        })
            .catch((err) => alert(err));
    }
};

index.init();
