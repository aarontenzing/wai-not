$(function() {
	$('#btnFav').click(function() {
		let content_id = $('#hidContentId').val(),
			action = $(this).hasClass('active') ? 'remove' : 'add';
		
		$(this).toggleClass('active').data('mp3', '').prop('title','');
		$(this).find('svg').attr("data-prefix", action === 'remove' ? "far" : "fas");
		
		$.ajax({
			url: '/page/favourite',
			method: 'post',
			data: { content_id : content_id, action: action }
		});
	});
	
	
	$('.divReaction button').click(function() {
		if($(this).is(':disabled')) {
			return false;
		}
		if($('.divReaction.selected').length === 1) {
			let count_prev_el = $('.divReaction.selected .react_counter span');
			count_prev_el.text(parseInt(count_prev_el.text()) - 1);
		}
		$('.divReaction').removeClass('selected');
		$('.divReaction button').prop('disabled', false);
		$(this).prop('disabled', true);
		$(this).closest('.divReaction').addClass('selected');
		let count_el = $(this).closest('.divReaction').find('.react_counter span');
		count_el.text(parseInt(count_el.text()) + 1);
		let emoji = $(this).data('emoji');
		let content_id = $('#hidContentId').val();
		
		$.ajax({
			url: '/page/react',
			method: 'post',
			data: { content_id: content_id, emoji: emoji }
		});
	});
	
	if($('#article').text().trim().length === $('#article .rs_skip').text().trim().length) {
		$('#rs_btn').remove();
	}
	
	$('#modalImage').on('show.bs.modal', function (e) {
		let src = $(e.relatedTarget).find('img').prop('src'),
			last = src.lastIndexOf('.'),
			new_src = src.slice(0, last) + '_large' + src.slice(last),
			img = $('<img>', { src: new_src, alt: '', class: 'img-fluid' });
		
		$(this).find('.modal-body').html(img);
	});
});