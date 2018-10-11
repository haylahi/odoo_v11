from odoo import models, fields, api,exceptions

class gcapi_dashboard(models.Model):
	_name = "gcapi.dashboard"

	@api.model
	def get_invoices_amount(self):
		account_invoice = self.env['account.invoice']
		states = {'draft':"Brouillon",'open':"Ouverte",'paid':"Payée",'cancel':"Annulée"}
		all_data = []
		for k,state in states.items():
			data_by_state = []
			data_by_state.append(state)
			invoices_by_state = account_invoice.search([('state','=',k)])
			amount = sum([l.amount_total for l in invoices_by_state])
			data_by_state.append(amount)
			all_data.append(data_by_state)
		return all_data
