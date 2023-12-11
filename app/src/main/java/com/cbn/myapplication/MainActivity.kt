package com.cbn.myapplication

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.cbn.myapplication.BounceRecyclerView
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        recycler_view.adapter = object : BounceRecyclerView.BounceRecyclerAdapter<Holder>() {
            override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder = Holder(LayoutInflater.from(parent.context).inflate(R.layout.support_simple_spinner_dropdown_item, parent, false))

            override fun onBindViewHolder(holder: Holder, position: Int) {
                holder.itemView.findViewById<TextView>(android.R.id.text1).text = "Text $position"
            }

            override fun getItemCount(): Int = 100

        }
    }

    inner class Holder(itemView: View) : BounceRecyclerView.BounceRecyclerHolder(itemView)
}