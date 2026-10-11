import React from 'react';
import AdminPageShell from '../../components/Admin/AdminPageShell';
import AdminEmptyState from '../../components/Admin/AdminEmptyState';

const Testimonial = () => (
	<AdminPageShell
		eyebrow="Content"
		title="Testimonials"
		subtitle="Reviews and quotes shown on your landing pages."
		actions={
			<button type="button" className="dash-btn dash-btn--solid">
				<i className="bi bi-plus-lg me-2"></i>Add testimonial
			</button>
		}
	>
		<AdminEmptyState
			icon="bi-chat-square-quote"
			title="No testimonials yet"
			message="Publish customer quotes to build trust on the public site."
		/>
	</AdminPageShell>
);

export default Testimonial;